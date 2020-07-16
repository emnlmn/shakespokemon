import { PokemonName } from '../valueObject/PokemonName';

export default (name: string): PokemonName => (name.length ? name : '');
