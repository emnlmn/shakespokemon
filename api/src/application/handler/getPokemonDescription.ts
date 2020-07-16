import { Request, Response } from 'restify';
import { RetrieveShakespeareanPokemon } from '../../domain/pokemon/useCase/RetrieveShakespeareanPokemon';

const getPokemonDescription = (useCase: RetrieveShakespeareanPokemon) => (req: Request, res: Response) => {
  const pokemonName = req.params.name.length ? req.params.name : '';

  res.send(useCase(pokemonName));
};

export default getPokemonDescription;
