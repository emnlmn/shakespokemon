import { PokemonRepository } from '../../domain/pokemon/repository/PokemonRepository';

const remotePokemonRepository: PokemonRepository = (name) => ({ name, description: 'hello there' });

export default remotePokemonRepository;
