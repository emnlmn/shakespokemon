import * as O from 'fp-ts/lib/Option';

export interface NonEmptyShakespeareanDescription {
  readonly ShakespeareanDescription: unique symbol;
}

export type ShakespeareanDescription = string & NonEmptyShakespeareanDescription;

const isNonEmptyPokemonDescription = (s: string): s is ShakespeareanDescription => s.length > 0;

export const makeNonEmptyShakespeareanDescription = (s: string): O.Option<ShakespeareanDescription> =>
  isNonEmptyPokemonDescription(s) ? O.some(s) : O.none;
