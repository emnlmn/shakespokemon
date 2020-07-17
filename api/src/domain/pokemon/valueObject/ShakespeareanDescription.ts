import { none, Option, some } from 'fp-ts/lib/Option';

export interface NonEmptyShakespeareanDescription {
  readonly ShakespeareanDescription: unique symbol;
}

export type ShakespeareanDescription = string & NonEmptyShakespeareanDescription;

const isNonEmptyPokemonDescription = (s: string): s is ShakespeareanDescription => s.length > 0;

export const makeNonEmptyShakespeareanDescription = (s: string): Option<ShakespeareanDescription> =>
  isNonEmptyPokemonDescription(s) ? some(s) : none;
