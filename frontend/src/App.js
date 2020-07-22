import React from 'react';
import SearchPokemonContainer from './containers/SearchPokemon/SearchPokemonContainer'
import FavoriteList from "./components/Favorites/FavoriteList";
import useReducerWithLocalStorage from "./hooks/useReducerWithLocalStorage";
import favoritePokemonReducer from "./store/reducers/favorites";
import {addPokemon, removePokemon} from "./store/actions/favorites";

function App() {
  const [{favoritePokemons}, dispatch] = useReducerWithLocalStorage(favoritePokemonReducer, {favoritePokemons: []}, 'favorites');
  
  return (
    <React.Fragment>
      <main>
        <SearchPokemonContainer addPokemonToFavorite={(pokemon) => dispatch(addPokemon(pokemon))}/>
      </main>
      <FavoriteList favoritePokemons={favoritePokemons} removeFromFavorite={(name) => dispatch(removePokemon(name))}/>
    </React.Fragment>
  );
}

export default App;
