import React from 'react';
import { Pokemon } from '../../store/actions/searchPokemon';

type Props = {
  pokemon: Pokemon,
  remove: () => void
}

const FavoriteItem = (props: Props) => {
  const {pokemon, remove} = props;

  return (
    <li>{pokemon.name} - {pokemon.description}<button onClick={remove}>Remove</button></li>
  )
};

export default FavoriteItem;