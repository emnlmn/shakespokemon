import { Request, Response } from 'restify';
import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import { makeNonEmptyPokemonName } from '../../domain/pokemon/valueObject/PokemonName';
import { RetrieveShakespeareanPokemon } from '../../domain/pokemon/useCase/retrieveShakespeareanPokemon';

const getPokemon = (retrieveShakespeareanPokemon: RetrieveShakespeareanPokemon) => async (
  req: Request,
  res: Response,
) => {
  // return res.send({name: Math.random().toString(36).substring(7), description: Math.random().toString(10).substring(Math.random())});
  return pipe(
    makeNonEmptyPokemonName(req.params.name || ''),
    O.fold(
      () => res.send(400, {error: 'Invalid Pokemon name'}),
      (pokemonName) => retrieveShakespeareanPokemon(pokemonName),
    ),
    TE.fold(
      (e) => res.send(400, e),
      (shakespeareanPokemon) => res.send(shakespeareanPokemon),
    ),
  )();
};

export default getPokemon;
