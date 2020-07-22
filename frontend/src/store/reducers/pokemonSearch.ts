import { Pokemon, SearchPokemonAction } from '../actions/searchPokemon';

export type ShakespeareanPokemonState = {
  pokemon?: Pokemon;
  isLoading: boolean;
  error?: string;
}

const pokemonSearch = (state: ShakespeareanPokemonState, action: SearchPokemonAction): ShakespeareanPokemonState => {
  switch (action.type) {
    case 'REQUEST':
      return { isLoading: true };
    case 'SUCCESS':
      return { isLoading: false, pokemon: action.pokemon };
    case 'FAILURE':
      return { isLoading: false, error: action.error };
    default:
      throw new Error('Action type not supported');
  }
}

export default pokemonSearch;