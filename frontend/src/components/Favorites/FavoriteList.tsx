import React from 'react';
import useReducerWithLocalStorage from '../../hooks/useReducerWithLocalStorage';
import pokemonSearch from '../../store/reducers/pokemonSearch';
import favoritePokemons from '../../store/reducers/favorites';
import FavoriteItem from './FavoriteItem';
import { Pokemon } from '../../store/actions/searchPokemon';

type Props = {
  favoritePokemons: Pokemon[],
  removeFromFavorite: (name: string) => void,
}

const favoriteList = (props: Props) => {
  const { favoritePokemons, removeFromFavorite } = props;

  const favoritePokemonList = favoritePokemons.map(
    pokemon => <FavoriteItem key={pokemon.name} pokemon={pokemon} remove={() => removeFromFavorite(pokemon.name)} />
  );

  return (
    <React.Fragment>
      <h3>Your favorite Pokemons</h3>
      <ul>
        {favoritePokemonList}
      </ul>
    </React.Fragment>
  );
};

export default favoriteList;