import * as restify from 'restify';
import { Server } from 'restify';
import getPokemonDescription from './handler/getPokemonDescription';
import retrieveShakespeareanPokemon from '../domain/pokemon/useCase/RetrieveShakespeareanPokemon';
import { PokemonRepository } from '../domain/pokemon/repository/PokemonRepository';
import { ShakespeareanTranslator } from '../domain/pokemon/pokemonTranslator/ShakespeareanTranslator';

const bootstrap = (pokemonRepository: PokemonRepository, shakespeareanTranslator: ShakespeareanTranslator): Server => {
  const getPokemonDescriptionHandler = getPokemonDescription(
    retrieveShakespeareanPokemon(pokemonRepository, shakespeareanTranslator),
  );

  const server = restify.createServer();
  server.get('/pokemon/:name', getPokemonDescriptionHandler);

  server.listen(8080, () => console.log('%s listening at %s', server.name, server.url));

  return server;
};

export default bootstrap;
