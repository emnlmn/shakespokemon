import React from 'react';
import { Pokemon } from '../../store/actions/searchPokemon';

type Props = {
  pokemon: Pokemon,
  addToFavorite: () => void,
}

const pokemonResult = (props: Props) => {
  const {pokemon, addToFavorite} = props;

  return (
    <div className={'pokemonCard'}>
      <h2>{pokemon.name}</h2>
      <p>{pokemon.description}</p>
      <button onClick={addToFavorite}>Add to favorite</button>
    </div>
  );
}

export default pokemonResult;