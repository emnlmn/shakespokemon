import * as O from 'fp-ts/lib/Option';

export interface NonEmptyPokemonName {
  readonly PokemonName: unique symbol;
}

export type PokemonName = string & NonEmptyPokemonName;

const isNonEmptyPokemonName = (s: string): s is PokemonName => s.length > 0;

export const makeNonEmptyPokemonName = (s: string): O.Option<PokemonName> =>
  isNonEmptyPokemonName(s) ? O.some(s) : O.none;
