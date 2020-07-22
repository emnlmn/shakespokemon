import React, { useReducer, useState } from 'react';
import SearchForm from '../../components/Search/SearchForm';
import PokemonResult from '../../components/Search/PokemonResult';
import pokemonSearch from '../../store/reducers/pokemonSearch';
import { Pokemon, searchPokemon } from '../../store/actions/searchPokemon';

type Props = {
  addPokemonToFavorite: (pokemon: Pokemon) => void
}

const SearchPokemonContainer = (props: Props) => {
  const {addPokemonToFavorite} = props;
  const [searchTerm, updateSearchTerm] = useState('');
  const [{pokemon, isLoading, error}, dispatch] = useReducer(pokemonSearch, {isLoading: false});

  const loadingMessage = isLoading ? <p>Searching for Pokemon {searchTerm}</p> : null;
  const errorMessage = error ? <p>Error while searching: {error}</p> : null;
  const pokemonResultComponent = pokemon
    ? <PokemonResult pokemon={pokemon} addToFavorite={() => {addPokemonToFavorite(pokemon)}}/>
    : null;

  return (
    <React.Fragment>
      <h1>ShakesPokemon</h1>
      <SearchForm searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} onSubmit={() => {
        searchPokemon(searchTerm)(dispatch)

      }}/>
      {loadingMessage}
      {errorMessage}
      {pokemonResultComponent}
    </React.Fragment>
  );
};

export default SearchPokemonContainer;