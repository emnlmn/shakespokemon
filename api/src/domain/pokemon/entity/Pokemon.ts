import { PokemonName } from '../valueObject/PokemonName';
import { PokemonDescription } from '../valueObject/PokemonDescription';

export interface Pokemon {
  readonly name: PokemonName;
  readonly description: PokemonDescription;
}

export const makePokemon = (name: PokemonName, description: PokemonDescription): Pokemon => ({ name, description });
