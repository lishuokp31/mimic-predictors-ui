import { i18nSepsis, i18nMi, i18nVancomycin } from './i18n';
import { ModelFeature, FeatureMap, I18nVM } from './types';
import miFromMapping from './mi/mapping';
import sepsisFromMapping from './sepsis/mapping';
import vancomycinFromMapping from './vancomycin/mapping';

export const miFeatures = processMapping(miFromMapping, i18nMi);
export const sepsisFeatures = processMapping(sepsisFromMapping, i18nSepsis);
export const vancomycinFeatures = processMapping(
  vancomycinFromMapping,
  i18nVancomycin
);

function processMapping(
  { demo, vitals, cbc, labs, meds }: FeatureMap,
  i18n: I18nVM[]
) {
  const combination = [demo, vitals, cbc, labs, meds];
  const features: ModelFeature[] = combination
    .flatMap((group) => group.features)
    .map(([id, identifier]) => ({
      id,
      identifier,
      label: i18n[id].label,
      unit: i18n[id].unit,
    }));

  // set feature headers
  let headerIndex = 0;
  features[headerIndex].header = demo.label;
  headerIndex += demo.features.length;
  features[headerIndex].header = vitals.label;
  headerIndex += vitals.features.length;
  features[headerIndex].header = cbc.label;
  headerIndex += cbc.features.length;
  features[headerIndex].header = labs.label;
  headerIndex += labs.features.length;
  features[headerIndex].header = meds.label;

  // filter out min/max/std
  return features.filter(
    (x) =>
      !x.identifier.endsWith('std') &&
      !x.identifier.endsWith('max') &&
      !x.identifier.endsWith('min')
  );
}
