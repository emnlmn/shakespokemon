import { PokemonName } from '../valueObject/PokemonName';
import { ShakespeareanDescription } from '../valueObject/ShakespeareanDescription';

export interface ShakespeareanPokemon {
  readonly name: PokemonName;
  readonly description: ShakespeareanDescription;
}

export const makeShakespeareanPokemon = (
  name: PokemonName,
  description: ShakespeareanDescription,
): ShakespeareanPokemon => ({ name, description });
