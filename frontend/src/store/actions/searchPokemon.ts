import axios from '../../axios-api';

export type SearchPokemonAction =
  | { type: 'REQUEST' }
  | { type: 'SUCCESS', pokemon: Pokemon }
  | { type: 'FAILURE', error: string };

export type Pokemon = {
  name: string,
  description: string,
}

export const fetchPokemon = () => {
  return {
    type: 'REQUEST',
  }
}

export const setPokemon = (pokemon: Pokemon) => {
  return {
    type: 'SUCCESS',
    pokemon,
  };
};

export const fetchPokemonFailed = (error: string) => {
  return {
    type: 'FAILURE',
    error,
  };
};

export const searchPokemon = (name: string) => {
  return (dispatch: any) => {
    dispatch(fetchPokemon());
    axios.get( `pokemon/${name}` )
      .then( response => {
        dispatch(setPokemon(response.data));
      } )
      .catch( error => {
        dispatch(fetchPokemonFailed(error?.response?.data?.error || error.message));
      });
  };
};