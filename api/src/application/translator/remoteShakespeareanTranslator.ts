import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import { ShakespeareanTranslator } from '../../domain/pokemon/pokemonTranslator/ShakespeareanTranslator';
import translateDescription from '../adapter/funTranslations';
import { makeShakespeareanPokemon } from '../../domain/pokemon/entity/ShakespeareanPokemon';

const remoteShakespeareanTranslator: ShakespeareanTranslator = (pokemon) => {
  return pipe(
    translateDescription(pokemon.description),
    TE.fold(
      (error) => TE.left({ error: error.message }),
      O.fold(
        () => TE.left({ error: 'Pokemon not found' }),
        (description) => TE.right(makeShakespeareanPokemon(pokemon.name, description)),
      ),
    ),
  );
};

export default remoteShakespeareanTranslator;
