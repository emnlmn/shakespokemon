import * as TE from 'fp-ts/lib/TaskEither';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { PokemonRepository } from '../../domain/pokemon/repository/PokemonRepository';
import { makePokemon } from '../../domain/pokemon/entity/Pokemon';
import fetchPokemonDescription from '../adapter/pokeApi';

const remotePokemonRepository: PokemonRepository = (name) => {
  return pipe(
    fetchPokemonDescription(name),
    TE.fold(
      (error) => TE.left({ error: error.message }),
      O.fold(
        () => TE.left({ error: 'Pokemon not found' }),
        (description) => TE.right(makePokemon(name, description)),
      ),
    ),
  );
};

export default remotePokemonRepository;
