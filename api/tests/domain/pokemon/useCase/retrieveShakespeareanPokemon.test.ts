import { PokemonRepository } from '../../../../src/domain/pokemon/repository/PokemonRepository';
import remotePokemonRepository from '../../../../src/application/repository/remotePokemonRepository';
import { Pokemon } from '../../../../src/domain/pokemon/entity/Pokemon';
import { ShakespeareanTranslator } from '../../../../src/domain/pokemon/pokemonTranslator/ShakespeareanTranslator'
import * as TE from 'fp-ts/lib/TaskEither';
import * as T from 'fp-ts/lib/Task';
import { ShakespeareanPokemon } from '../../../../src/domain/pokemon/entity/ShakespeareanPokemon';
import { retrieveShakespeareanPokemon } from '../../../../src/domain/pokemon/useCase/retrieveShakespeareanPokemon';
import { PokemonName } from '../../../../src/domain/pokemon/valueObject/PokemonName';
import { pipe } from 'fp-ts/lib/pipeable';

describe("Given a Pokemon name, should retrieve a Pokemon with a shakespearean description", () => {
  it("Should delegate the pokemon repository and translator to retrieve the Pokemon", () => {
    const pokemonName: PokemonName = 'Charizard' as PokemonName;

    const pokemon: Pokemon = {
      name: 'Charizard',
      description: 'Throws flames',
    } as any as Pokemon;

    const shakespeareanPokemon: ShakespeareanPokemon = {
      name: 'Charizard',
      description: 'Throw flames translated',
    } as any as ShakespeareanPokemon;

    const pokemonRepository: PokemonRepository = jest.fn().mockReturnValue(TE.right(pokemon));
    const shakespeareanTranslator: ShakespeareanTranslator = jest.fn().mockReturnValue(TE.right(shakespeareanPokemon));

    pipe(
      retrieveShakespeareanPokemon(pokemonRepository, shakespeareanTranslator)(pokemonName),
      TE.fold(
        fail,
        (result) => T.of(expect(result).toBe(shakespeareanPokemon))
      ),
    )();
  });

  it("Should fail when could not find Pokemon", () => {
    const pokemonName: PokemonName = 'Charizard' as PokemonName;

    const shakespeareanPokemon: ShakespeareanPokemon = {
      name: 'Charizard',
      description: 'Throw flames translated',
    } as any as ShakespeareanPokemon;

    const pokemonRepository: PokemonRepository = jest.fn().mockReturnValue(TE.left({error: 'Pokemon not found'}));
    const shakespeareanTranslator: ShakespeareanTranslator = jest.fn().mockReturnValue(TE.right(shakespeareanPokemon));

    pipe(
      retrieveShakespeareanPokemon(pokemonRepository, shakespeareanTranslator)(pokemonName),
      TE.fold(
        (error) => T.of(expect(error).toStrictEqual({error: 'Pokemon not found'})),
        fail,
      ),
    )();
  });

  it("Should fail when could not translate pokemon description", () => {
    const pokemonName: PokemonName = 'Charizard' as PokemonName;

    const pokemon: Pokemon = {
      name: 'Charizard',
      description: 'Throws flames',
    } as any as Pokemon;

    const pokemonRepository: PokemonRepository = jest.fn().mockReturnValue(TE.right(pokemon));
    const shakespeareanTranslator: ShakespeareanTranslator = jest.fn().mockReturnValue(TE.left({erorr: 'could not translate'}));

    pipe(
      retrieveShakespeareanPokemon(pokemonRepository, shakespeareanTranslator)(pokemonName),
      TE.fold(
        (result) => T.of(expect(result).toStrictEqual({erorr: 'could not translate'})),
        fail
      ),
    )();
  });
});