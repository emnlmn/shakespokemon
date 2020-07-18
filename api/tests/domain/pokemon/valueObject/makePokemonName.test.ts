import { makeNonEmptyPokemonName } from '../../../../src/domain/pokemon/valueObject/PokemonName';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

describe("Should validate the string and return a valid PokemonName", () => {
  it("Return some PokemonName", () => {
    const wantedName = 'Charizard';

    pipe(
      makeNonEmptyPokemonName(wantedName),
      O.fold(
        fail,
        pokemonName => expect(pokemonName).toStrictEqual(wantedName)
      ),
    )
  });

  it("Return none PokemonName", () => {
    const wantedName = '';

    const pokemonNameOption = makeNonEmptyPokemonName(wantedName);

    expect(O.isNone(pokemonNameOption)).toBeTruthy();
  });
})