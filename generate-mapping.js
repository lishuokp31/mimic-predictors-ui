const fs = require('fs');
const outputPath = './src/app/mapping.json';

const mappingSepsis = require('./data/sepsis/mapping.json');
const mappingMi = require('./data/mi/mapping.json');
const mappingVancomycin = require('./data/vancomycin/mapping.json');
const i18nSepsis = require('./data/sepsis/i18n.json');
const i18nMi = require('./data/mi/i18n.json');
const i18nVancomycin = require('./data/vancomycin/i18n.json');

function findRelatedIDs(flattened, identifier) {
  const relatedIdentifiers = new Set(
    ['_min', '_max', '_std'].map((x) => identifier + x)
  );
  const results = flattened
    .filter(([_id, _identifier]) => relatedIdentifiers.has(_identifier))
    .map(([_id]) => _id);

  return results;
}

function findFirst(features, featureGroup) {
  return features.findIndex(
    (feature) => feature.identifier == featureGroup.features[0][1]
  );
}

function getMapping(mapping, i18n) {
  const { demo, vitals, cbc, labs, meds } = mapping;
  const combination = [demo, vitals, cbc, labs, meds];
  const flattened = combination.flatMap((group) => group.features);
  const features = flattened
    .filter(
      ([, identifier]) =>
        !identifier.endsWith('_min') &&
        !identifier.endsWith('_max') &&
        !identifier.endsWith('_std')
    )
    .map(([id, identifier]) => ({
      id,
      identifier,
      label: i18n[id][1],
      unit: i18n[id][3],
      relatedIDs: findRelatedIDs(flattened, identifier),
    }));

  // attach feature group labels
  combination.forEach((featureGroup) => {
    const index = findFirst(features, featureGroup);
    features[index].header = featureGroup.label;
  });

  return features;
}

const sepsisFeatures = getMapping(mappingSepsis, i18nSepsis);
const miFeatures = getMapping(mappingMi, i18nMi);
const vancomycinFeatures = getMapping(mappingVancomycin, i18nVancomycin);
const result = JSON.stringify({
  sepsisFeatures,
  miFeatures,
  vancomycinFeatures,
});

// generate file
fs.writeFileSync(outputPath, result);
