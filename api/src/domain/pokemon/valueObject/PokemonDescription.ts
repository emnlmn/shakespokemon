import { none, Option, some } from 'fp-ts/lib/Option';

export interface NonEmptyPokemonDescription {
  readonly PokemonDescription: unique symbol;
}

export type PokemonDescription = string & NonEmptyPokemonDescription;

const isNonEmptyPokemonDescription = (s: string): s is PokemonDescription => s.length > 0;

export const makeNonEmptyPokemonDescription = (s: string): Option<PokemonDescription> =>
  isNonEmptyPokemonDescription(s) ? some(s) : none;
