import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import { ShakespeareanTranslator } from '../../domain/pokemon/pokemonTranslator/ShakespeareanTranslator';
import { makeShakespeareanPokemon } from '../../domain/pokemon/entity/ShakespeareanPokemon';
import { makeNonEmptyShakespeareanDescription } from '../../domain/pokemon/valueObject/ShakespeareanDescription';

const remoteShakespeareanTranslator: ShakespeareanTranslator = (pokemon) => {
  return pipe(
    makeNonEmptyShakespeareanDescription('So cool '),
    O.fold(
      () => TE.left({ error: 'Could not retrieve shakespearean Pokemon description' }),
      (description) => TE.right(makeShakespeareanPokemon(pokemon.name, description)),
    ),
  );
};

export default remoteShakespeareanTranslator;
