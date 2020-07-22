import { Pokemon, SearchPokemonAction } from '../actions/searchPokemon';
import { ShakespeareanPokemonState } from './pokemonSearch';
import { FavoriteAction } from '../actions/favorites';

export type FavoritePokemons = {
  favoritePokemons: Pokemon[];
}

const favoritePokemons = (state: FavoritePokemons, action: FavoriteAction): FavoritePokemons => {
  switch (action.type) {
    case 'ADD_POKEMON':
      return {
        favoritePokemons: state.favoritePokemons.some(pokemon => pokemon.name === action.pokemon.name)
          ? state.favoritePokemons
          : [...state.favoritePokemons, action.pokemon]
      };
    case 'REMOVE_POKEMON':
      return {
        favoritePokemons: state.favoritePokemons.filter(pokemon => pokemon.name !== action.name)
      };
  }
}

export default favoritePokemons;