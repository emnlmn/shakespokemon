import { PokemonName } from '../valueObject/PokemonName';
import { Pokemon } from '../model/Pokemon';

export type PokemonRepository = (name: PokemonName) => Pokemon;
