import { Feature } from '../types';

export function zeros1d(length: number): number[] {
  return Array(length).fill(0);
}

export function zeros2d(a1: number, a2: number): number[][] {
  return Array(a1).fill(Array(a2).fill(0));
}

export function range(end: number): number[] {
  return Array(end)
    .fill(0)
    .map((_, i) => i);
}

export function getFeatureWeight(
  feature: Feature,
  day: number,
  weights: number[][]
): number {
  const relatedIDs = feature.aggregates
    ? [feature.aggregates.min, feature.aggregates.max, feature.aggregates.std]
    : [];
  const totalWeight = [feature.id, ...relatedIDs]
    .map((id) => weights[day][id])
    .reduce((a, v) => a + v, 0);

  return totalWeight;
}

export function getEmptyDayStart(x: number[][]): number {
  const daysNonEmpty = x.map((values) => values.some((value) => value !== 0));
  const lastNonEmptyDay = daysNonEmpty.lastIndexOf(true);

  return lastNonEmptyDay + 1;
}

export function truncatePaddingDays(x: number[][]): number[][] {
  const emptyDayStart = getEmptyDayStart(x);
  const endIndex = Math.max(1, emptyDayStart);
  const truncatedX = x.slice(0, endIndex);

  return truncatedX;
}

export function addPaddingDays1d(x: number[], nDays: number): number[] {
  const nToAddDays = nDays - x.length;
  const paddingDays = zeros1d(nToAddDays);
  const paddedX = x.concat(paddingDays);

  return paddedX;
}

export function addPaddingDays2d(x: number[][], nDays: number): number[][] {
  const nFeatures = x[0].length;
  const nToAddDays = nDays - x.length;
  const paddingDays = zeros2d(nToAddDays, nFeatures);
  const paddedX = x.concat(paddingDays);

  return paddedX;
}
