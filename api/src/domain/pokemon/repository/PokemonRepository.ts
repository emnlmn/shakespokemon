import { TaskEither } from 'fp-ts/lib/TaskEither';
import { PokemonName } from '../valueObject/PokemonName';
import { DomainError } from '../error/DomainError';
import { Pokemon } from '../entity/Pokemon';

export type PokemonRepository = (name: PokemonName) => TaskEither<DomainError, Pokemon>;
