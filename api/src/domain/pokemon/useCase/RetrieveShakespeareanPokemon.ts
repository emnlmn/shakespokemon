import { PokemonName } from '../valueObject/PokemonName';
import { ShakespeareanPokemon } from '../model/ShakespeareanPokemon';
import { PokemonRepository } from '../repository/PokemonRepository';
import { ShakespeareanTranslator } from '../pokemonTranslator/ShakespeareanTranslator';

export type RetrieveShakespeareanPokemon = (name: PokemonName) => ShakespeareanPokemon;

const retrieveShakespeareanPokemon = (
  repository: PokemonRepository,
  translator: ShakespeareanTranslator,
): RetrieveShakespeareanPokemon => (name: PokemonName) => translator(repository(name));

export default retrieveShakespeareanPokemon;
