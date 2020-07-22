import React, { useReducer, useState } from 'react';
import SearchForm from '../../components/Search/SearchForm';
import PokemonResult from '../../components/Search/PokemonResult';
import pokemonSearch from '../../store/reducers/pokemonSearch';
import { Pokemon, searchPokemon } from '../../store/actions/searchPokemon';
import './SearchPokemonContainer.css';

type Props = {
  addPokemonToFavorite: (pokemon: Pokemon) => void
}

const SearchPokemonContainer = (props: Props) => {
  const {addPokemonToFavorite} = props;
  const [searchTerm, updateSearchTerm] = useState('');
  const [{pokemon, isLoading, error}, dispatch] = useReducer(pokemonSearch, {isLoading: false});

  const loadingMessage = isLoading ? <div>Searching for Pokemon {searchTerm}</div> : null;
  const errorMessage = error ? <div className={'errorAlert'}><span>Error while searching: {error}</span></div> : null;
  const pokemonResultComponent = pokemon
    ? <PokemonResult pokemon={pokemon} addToFavorite={() => {addPokemonToFavorite(pokemon)}}/>
    : null;

  return (
    <div className={'searchPokemonContainer'}>
      <SearchForm searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} onSubmit={() => {
        searchPokemon(searchTerm)(dispatch)
      }}/>
      {loadingMessage}
      {errorMessage}
      {pokemonResultComponent}
    </div>
  );
};

export default SearchPokemonContainer;