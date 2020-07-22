import React from 'react';
import SearchPokemonContainer from './containers/SearchPokemon/SearchPokemonContainer'
import FavoriteList from "./components/Favorites/FavoriteList";
import useReducerWithLocalStorage from "./hooks/useReducerWithLocalStorage";
import favoritePokemonReducer from "./store/reducers/favorites";
import {addPokemon, removePokemon} from "./store/actions/favorites";
import './App.css';

function App() {
  const [{favoritePokemons}, dispatch] = useReducerWithLocalStorage(favoritePokemonReducer, {favoritePokemons: []}, 'favorites');
  
  return (
    <div className={'app'}>
      <header className={'header'}>
        <h1 className={'appTitle'}>ShakesPokemon</h1>
      </header>
      <main>
        <SearchPokemonContainer addPokemonToFavorite={(pokemon) => dispatch(addPokemon(pokemon))}/>
      </main>
      <FavoriteList favoritePokemons={favoritePokemons} removeFromFavorite={(name) => dispatch(removePokemon(name))}/>
    </div>
  );
}

export default App;
