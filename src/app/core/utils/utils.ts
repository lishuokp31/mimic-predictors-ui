import { Feature } from '../types';

export function zeros1d(length: number): number[] {
  return Array(length).fill(0);
}

export function zeros2d(a1: number, a2: number): number[][] {
  return Array(a1).fill(Array(a2).fill(0));
}

export function getFeatureWeight(
  feature: Feature,
  day: number,
  weights: number[][]
) {
  const ids = [feature.id, ...feature.relatedIDs];
  const totalWeight = ids
    .map((id) => weights[day][id])
    .reduce((a, v) => a + v, 0);

  return totalWeight;
}
