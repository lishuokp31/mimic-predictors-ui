// english, chinese, (min/max/std), unit
export type I18nTuple = [string, string, string | null, string | null];

// label - what is shown in the UI
// symbol - symbol of (min/max/std)
// extra - min/max/std
// unit - feature unit
export type I18nVM = {
  label: string;
  unit: string | null;
};

export interface FeatureMap {
  cbc: FeatureGroup;
  vitals: FeatureGroup;
  labs: FeatureGroup;
  demo: FeatureGroup;
  meds: FeatureGroup;
}

export interface FeatureGroup {
  label: string;
  features: [number, string][];
}

export interface ModelFeature {
  header?: string;
  id: number;
  identifier: string;
  label: string;
  unit: string | null;
}
