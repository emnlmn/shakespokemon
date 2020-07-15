import { PokemonName } from '../valueObject/PokemonName';
import { ShakespeareanPokemon } from '../model/ShakespeareanPokemon';
import { PokemonRepository } from '../repository/PokemonRepository';
import { ShakespeareanTranslator } from '../pokemonTranslator/ShakespeareanTranslator';

export type getShakespeareanPokemonByName = (pokemonRepository: PokemonRepository, shakespeareanTranslator: ShakespeareanTranslator) =>
  (name: PokemonName) => ShakespeareanPokemon;
