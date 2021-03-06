import got, { Response } from 'got';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { flow, pipe } from 'fp-ts/lib/function';
import { PokemonDescription } from '../../domain/pokemon/valueObject/PokemonDescription';
import { makeNonEmptyShakespeareanDescription } from '../../domain/pokemon/valueObject/ShakespeareanDescription';

const baseUrl = 'https://api.funtranslations.com/translate/';

const translationResponse = t.type({
  success: t.type({
    total: t.number,
  }),
  contents: t.type({
    translated: t.string,
    text: t.string,
    translation: t.string,
  }),
});

export const funTranslationsApi = got.extend({
  prefixUrl: baseUrl,
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
          error.name = `[FunTranslation] ${error.name}`;

          throw error;
        }
      })();
    },
  ],
});

const decodeWith = <A>(decoder: t.Decoder<unknown, A>) =>
  flow(
    decoder.decode,
    E.mapLeft((_) => new Error('[FunTranslation] Response decoding error')),
    TE.fromEither,
  );

const fetchTranslatedDescription = (pokemonDescription: PokemonDescription) => {
  return TE.tryCatch<Error, Response>(
    () => funTranslationsApi(`shakespeare.json?text=${pokemonDescription}`),
    (reason) => new Error(String(reason)),
  );
};

const translateDescription = (pokemonDescription: PokemonDescription) => {
  return pipe(
    fetchTranslatedDescription(pokemonDescription),
    TE.map((response) => response.body),
    TE.chain(decodeWith(translationResponse)),
    TE.map((decodedBody) => decodedBody.contents),
    TE.map((content) => (content.translated ? content.translated : '')),
    TE.map(makeNonEmptyShakespeareanDescription),
  );
};

export default translateDescription;
