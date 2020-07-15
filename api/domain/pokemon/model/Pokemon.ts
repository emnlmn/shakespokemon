import { PokemonName } from '../valueObject/PokemonName';
import { PokemonDescription } from '../valueObject/PokemonDescription';
import { ShakespeareanDescription } from '../valueObject/ShakespeareanDescription';

export type Pokemon = {
  readonly name: PokemonName,
  readonly description: PokemonDescription,
}
