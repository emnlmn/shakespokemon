import * as TE from 'fp-ts/lib/TaskEither';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { PokemonRepository } from '../../domain/pokemon/repository/PokemonRepository';
import { makeNonEmptyPokemonDescription } from '../../domain/pokemon/valueObject/PokemonDescription';
import { makePokemon } from '../../domain/pokemon/entity/Pokemon';

const remotePokemonRepository: PokemonRepository = (name) => {
  return pipe(
    makeNonEmptyPokemonDescription('lore ipsum'),
    O.fold(
      () => TE.left({ error: `Pokemon with name ${name} not found.` }),
      (description) => TE.right(makePokemon(name, description)),
    ),
  );
};

export default remotePokemonRepository;
