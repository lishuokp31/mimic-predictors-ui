export interface Feature {
  id: number;
  identifier: string;
  group: string;
  label: string;
  unit: string | null;
  relatedIDs: number[];
}

export type GroupLabel =
  | 'demographic'
  | 'vitals'
  | 'cbc w/ differential'
  | 'labs'
  | 'medications';

declare module 'mapping.json' {
  export const sepsisFeatures: Feature[];
  export const miFeatures: Feature[];
  export const vancomycinFeatures: Feature[];
}
