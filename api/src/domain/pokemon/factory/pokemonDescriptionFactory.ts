import { PokemonDescription } from '../valueObject/PokemonDescription';

export default (description: string): PokemonDescription => (description.length ? description : '');
