import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Pokemon } from '../entity/Pokemon';
import { ShakespeareanPokemon } from '../entity/ShakespeareanPokemon';
import { DomainError } from '../error/DomainError';

export type ShakespeareanTranslator = (pokemon: Pokemon) => TaskEither<DomainError, ShakespeareanPokemon>;
