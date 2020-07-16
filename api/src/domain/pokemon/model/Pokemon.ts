import { PokemonName } from '../valueObject/PokemonName';
import { PokemonDescription } from '../valueObject/PokemonDescription';

export type Pokemon = {
  readonly name: PokemonName;
  readonly description: PokemonDescription;
};
