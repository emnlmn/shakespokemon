import * as restify from 'restify';
import { Server } from 'restify';
import getPokemonDescription from './handler/getPokemonDescription';
import { retrieveShakespeareanPokemon } from '../domain/pokemon/useCase/retrieveShakespeareanPokemon';
import { PokemonRepository } from '../domain/pokemon/repository/PokemonRepository';
import { ShakespeareanTranslator } from '../domain/pokemon/pokemonTranslator/ShakespeareanTranslator';
import { AppConfig } from './config/configFactory';
import catchError from './handler/catchError';

const bootstrap = (
  pokemonRepository: PokemonRepository,
  shakespeareanTranslator: ShakespeareanTranslator,
  config: AppConfig,
): Server => {
  const getPokemonDescriptionHandler = catchError(
    getPokemonDescription(retrieveShakespeareanPokemon(pokemonRepository, shakespeareanTranslator)),
  );

  const server = restify.createServer();

  server.get('/pokemon/:name', getPokemonDescriptionHandler);
  server.listen(config.server.port, () => console.log('%s listening at %s', server.name, server.url));

  return server;
};

export default bootstrap;
