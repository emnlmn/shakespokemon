import got, { Response } from 'got';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { flow, pipe } from 'fp-ts/lib/function';
import { PokemonName } from '../../domain/pokemon/valueObject/PokemonName';

const cache = new Map();

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

type PokemonDescriptions = t.TypeOf<typeof pokemonFlavorTextEntries>;

const pokeApi = got.extend({
  prefixUrl: baseUrl,
  headers: {
    accept: 'application/json',
    'user-agent': 'shakespokemon',
  },
  cache,
  responseType: 'json',
  handlers: [
    (options, next) => {
      if (options.isStream) {
        return next(options);
      }

      // Magic begins
      return (async () => {
        try {
          return await next(options);
        } catch (error) {
          const { response } = error;

          if (response && response.body) {
            error.name = 'PokeApiError';
            error.message = `${response.body.message} (${response.statusCode} status code)`;
          }

          throw error;
        }
      })();
    },
  ],
});

const decodeWith = <A>(decoder: t.Decoder<unknown, A>) =>
  flow(
    decoder.decode,
    E.mapLeft((_) => new Error('PokeApi decoding error')),
    TE.fromEither,
  );

const getPokemonSpecies = (pokemonName: PokemonName) =>
  TE.tryCatch<Error, Response>(
    () => pokeApi(pokemonName),
    (reason) => new Error(String(reason)),
  );

const fetchPokemonDescription = (pokemonName: PokemonName): TE.TaskEither<Error, string> => {
  return pipe(
    getPokemonSpecies(pokemonName),
    TE.map((x) => x.body),
    TE.chain(decodeWith(pokemonFlavorTextEntries)),
    TE.map((decodedBody) => decodedBody.flavor_text_entries),
    TE.map((entries) => (entries.length ? entries.filter((entry) => entry.language.name === 'en').pop() : '')),
    TE.map((description) => (description ? description.flavor_text : '')),
  );
};

export default fetchPokemonDescription;
