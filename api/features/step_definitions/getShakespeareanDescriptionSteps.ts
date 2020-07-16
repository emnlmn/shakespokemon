import { Server } from 'restify';
import { AfterAll, Before, BeforeAll, Given, TableDefinition, Then, When } from 'cucumber';
import got, { Response } from 'got';
import pokemonNameFactory from '../../src/domain/pokemon/factory/pokemonNameFactory';
import pokemonDescriptionFactory from '../../src/domain/pokemon/factory/pokemonDescriptionFactory';
import bootstrap from '../../src/application/bootstrap';
import { PokemonRepository } from '../../src/domain/pokemon/repository/PokemonRepository';
import { Pokemon } from '../../src/domain/pokemon/model/Pokemon';
import { ShakespeareanTranslator } from '../../src/domain/pokemon/pokemonTranslator/ShakespeareanTranslator';

const assert = require('assert');

let pokemon: Pokemon;
let response: Response<string>;
let applicationServer: Server;
const repositoryMock: PokemonRepository = (_) => pokemon;
const translatorMock: ShakespeareanTranslator = (_) => pokemon;

Before(() => {
  pokemon = ({} as any) as Pokemon;
  response = ({} as any) as Response<string>;
});

BeforeAll(() => {
  applicationServer = bootstrap(repositoryMock, translatorMock);
});

AfterAll(() => {
  applicationServer.close();
});

Given('this Pokemon', (dataTable: TableDefinition) => {
  const fixture = dataTable.rowsHash();

  pokemon = {
    name: pokemonNameFactory(fixture.name),
    description: pokemonDescriptionFactory(fixture['shakespearean description']),
  };
});

When('client request the description for the Pokemon {string}', async (name: string) => {
  response = await got.get(`http://localhost:8080/pokemon/${name}`);
});

Then('it should receive', (dataTable: TableDefinition) => {
  assert.strictEqual(response.statusCode, 200);

  const expectedData = dataTable.hashes().pop();
  const responseData = JSON.parse(response.body);

  assert.deepStrictEqual(expectedData, responseData);
});
