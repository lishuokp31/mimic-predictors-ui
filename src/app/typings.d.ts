export interface Feature {
  id: number;
  identifier: string;
  label: string;
  unit: string | null;
  relatedIDs: number[];
}

declare module 'mapping.json' {
  const sepsisFeatures: Feature[];
  const miFeatures: Feature[];
  const vancomycinFeatures: Feature[];
}
