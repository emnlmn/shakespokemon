import { chain, TaskEither } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import { PokemonName } from '../valueObject/PokemonName';
import { ShakespeareanPokemon } from '../entity/ShakespeareanPokemon';
import { PokemonRepository } from '../repository/PokemonRepository';
import { ShakespeareanTranslator } from '../pokemonTranslator/ShakespeareanTranslator';
import { DomainError } from '../error/DomainError';

export type RetrieveShakespeareanPokemon = (name: PokemonName) => TaskEither<DomainError, ShakespeareanPokemon>;

export const retrieveShakespeareanPokemon = (
  repository: PokemonRepository,
  translator: ShakespeareanTranslator,
): RetrieveShakespeareanPokemon => (name: PokemonName) => pipe(repository(name), chain(translator));
