import { PokemonName } from '../valueObject/PokemonName';
import { ShakespeareanDescription } from '../valueObject/ShakespeareanDescription';

export type ShakespeareanPokemon = {
  readonly name: PokemonName;
  readonly description: ShakespeareanDescription;
};
