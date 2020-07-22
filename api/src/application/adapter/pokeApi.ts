import got, { Response } from 'got';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';
import * as t from 'io-ts';
import { flow, pipe } from 'fp-ts/lib/function';
import { PokemonName } from '../../domain/pokemon/valueObject/PokemonName';
import {
  makeNonEmptyPokemonDescription,
  PokemonDescription
} from '../../domain/pokemon/valueObject/PokemonDescription';

const inMemoryCache = new Map();

const baseUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

const pokemonFlavorTextEntries = t.type({
  flavor_text_entries: t.array(
    t.type({
      flavor_text: t.string,
      language: t.type({
        name: t.string,
        url: t.string,
      }),
      version: t.type({
        name: t.string,
        url: t.string,
      }),
    }),
  ),
});

const pokeApi = got.extend({
  prefixUrl: baseUrl,
  cache: inMemoryCache,
  headers: {
    accept: 'application/json',
    'user-agent': 'shakespokemon',
  },
  responseType: 'json',
  handlers: [
    (options, next) => {
      if (options.isStream) {
        return next(options);
      }

      return (async () => {
        try {
          return await next(options);
        } catch (error) {
          error.name = `[PokeApi] ${error.name}`;

          throw error;
        }
      })();
    },
  ],
});

const decodeWith = <A>(decoder: t.Decoder<unknown, A>) =>
  flow(
    decoder.decode,
    E.mapLeft((_) => new Error('[PokeApi] Response decoding error')),
    TE.fromEither,
  );

const fetchPokemonSpecies = (pokemonName: PokemonName) =>
  TE.tryCatch<Error, Response>(
    () => pokeApi(pokemonName),
    (reason) => new Error(String(reason)),
  );

const fetchPokemonDescription = (pokemonName: PokemonName) => {
  return pipe(
    fetchPokemonSpecies(pokemonName),
    TE.map((response) => response.body),
    TE.chain(decodeWith(pokemonFlavorTextEntries)),
    TE.map((decodedBody) => decodedBody.flavor_text_entries),
    TE.map((entries) => (entries.length ? entries.filter((entry) => entry.language.name === 'en').pop() : '')),
    TE.map((description) => (description ? description.flavor_text : '')),
    TE.map(makeNonEmptyPokemonDescription),
  );
};

export default fetchPokemonDescription;
