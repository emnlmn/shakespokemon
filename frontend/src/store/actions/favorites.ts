import { Pokemon } from './searchPokemon';

export type FavoriteAction =
  | { type: 'ADD_POKEMON', pokemon: Pokemon }
  | { type: 'REMOVE_POKEMON', name: string };

export const addPokemon = (pokemon: Pokemon) => {
  return {
    type: 'ADD_POKEMON',
    pokemon,
  };
};

export const removePokemon = (name: string) => {
  return {
    type: 'REMOVE_POKEMON',
    name,
  };
};