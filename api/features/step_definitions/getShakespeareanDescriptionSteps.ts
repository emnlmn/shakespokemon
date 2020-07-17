import { Server } from 'restify';
import { AfterAll, BeforeAll, Given, TableDefinition, Then, When } from 'cucumber';
import got, { Response } from 'got';
import * as TE from 'fp-ts/lib/TaskEither';
import bootstrap from '../../src/application/bootstrap';
import { PokemonRepository } from '../../src/domain/pokemon/repository/PokemonRepository';
import { Pokemon } from '../../src/domain/pokemon/entity/Pokemon';
import { ShakespeareanTranslator } from '../../src/domain/pokemon/pokemonTranslator/ShakespeareanTranslator';
import { PokemonName } from '../../src/domain/pokemon/valueObject/PokemonName';
import { ShakespeareanPokemon } from '../../src/domain/pokemon/entity/ShakespeareanPokemon';
import { AppConfig } from '../../src/application/config/configFactory';
import { ShakespeareanDescription } from '../../src/domain/pokemon/valueObject/ShakespeareanDescription';

const assert = require('assert');

const testConfig: AppConfig = {
  environment: 'development',
  server: {
    port: 8082,
  },
};

let shakespeareanPokemon: ShakespeareanPokemon;
let lastResponse: Response<string>;
let applicationServer: Server;

const repositoryMock: PokemonRepository = (_) => TE.right({} as Pokemon);
const translatorMock: ShakespeareanTranslator = (_) => TE.right(shakespeareanPokemon);

BeforeAll(() => {
  applicationServer = bootstrap(repositoryMock, translatorMock, testConfig);
});

AfterAll(() => {
  applicationServer.close();
});

Given('this Pokemon', (dataTable: TableDefinition) => {
  const fixture = dataTable.rowsHash();

  shakespeareanPokemon = {
    name: fixture.name as PokemonName,
    description: fixture['shakespearean description'] as ShakespeareanDescription,
  };
});

When('client request the description for the Pokemon {string}', async (name: string) => {
  lastResponse = await got(`http://localhost:${testConfig.server.port}/pokemon/${name}`);
});

Then('it should receive', (dataTable: TableDefinition) => {
  assert.strictEqual(lastResponse.statusCode, 200);

  const expectedData = dataTable.hashes().pop();
  const responseData = JSON.parse(lastResponse.body);
  assert.deepStrictEqual(expectedData, responseData);
});
