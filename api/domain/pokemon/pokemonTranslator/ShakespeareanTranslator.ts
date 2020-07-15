import { Pokemon } from '../model/Pokemon';
import { ShakespeareanPokemon } from '../model/ShakespeareanPokemon';

export type ShakespeareanTranslator = (pokemon: Pokemon) => ShakespeareanPokemon;