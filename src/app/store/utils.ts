import { List } from 'immutable';

export function zeros2d(axis1: number, axis2: number): List<List<number>> {
  let a1: List<number>[] = [];

  for (let i = 0; i < axis1; i++) {
    a1.push(List(Array(axis2).fill(0)));
  }

  return List(a1);
}

export function zeros1d(axis1: number): List<number> {
  return List(Array(axis1).fill(0));
}
