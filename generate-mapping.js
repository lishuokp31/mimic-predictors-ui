const fs = require('fs');

const mappingAki = require('./data/aki/mapping.json');
const mappingSepsis = require('./data/sepsis/mapping.json');
const mappingMi = require('./data/mi/mapping.json');
const mappingVancomycin = require('./data/vancomycin/mapping.json');

const i18nAki = require('./data/aki/i18n.json');
const i18nSepsis = require('./data/sepsis/i18n.json');
const i18nMi = require('./data/mi/i18n.json');
const i18nVancomycin = require('./data/vancomycin/i18n.json');

function findAggregates(flattened, identifier) {
  const aggregatesIdentifiers = new Set(
    ['_min', '_max', '_std'].map((x) => identifier + x)
  );
  const results = flattened
    .filter(([, _identifier]) => aggregatesIdentifiers.has(_identifier))
    .map(([_id, _identifier]) => [_identifier.slice(-3), _id]);

  // sanity-check
  // related IDs length can only be 3 or 0
  if (results.length != 0 && results.length != 3) {
    throw `[ERROR] Related IDs for identifier="${identifier}" has: ${results.length}`;
  }

  // convert aggregates to object (if non-null)
  return results.length > 0 ? Object.fromEntries(results) : null;
}

function findFirst(features, featureGroup) {
  return features.findIndex(
    (feature) => feature.identifier == featureGroup.features[0][1]
  );
}

function flattenFeatureGroup(group) {
  // for group that is undefined
  // we just return an empty list
  if (typeof group === 'undefined') return [];

  return group.features.map(([id, identifier]) => [
    id,
    identifier,
    group.label,
  ]);
}

function getMapping(mapping, i18n) {
  // perform sanity checks for both mapping and i18n
  checkI18n(i18n);

  const { demo, vitals, cbc, labs, meds } = mapping;
  const combination = [demo, vitals, cbc, labs, meds];
  const flattened = combination.flatMap(flattenFeatureGroup);
  const features = flattened
    .filter(
      ([, identifier]) =>
        !identifier.endsWith('_min') &&
        !identifier.endsWith('_max') &&
        !identifier.endsWith('_std')
    )
    .map(([id, identifier, groupLabel]) => ({
      id,
      identifier,
      group: groupLabel.toLowerCase(),
      label: i18n[id][1],
      unit: i18n[id][3],
      aggregates: findAggregates(flattened, identifier),
    }));

  // attach feature group labels
  combination.forEach((featureGroup) => {
    // there are some items in `combination`
    // that is undefined for some pages (e.g., AKI page)
    if (typeof featureGroup === 'undefined') return;

    const index = findFirst(features, featureGroup);
    features[index].header = featureGroup.label;
  });

  return features;
}

function checkI18n(i18n) {
  // i18n should be a 2d-array
  // each element consists of a 4-element list
  // 1. chinese translation
  // 2. english label
  // 3. (optional) min/max/std label
  // 4. (optional) unit of the feature (e.g., kg, cm)
  if (!Array.isArray(i18n)) {
    throw `i18n is not an array`;
  }

  i18n.forEach((tuple) => {
    // check element if it is an array
    if (!Array.isArray(tuple)) {
      throw `i18n array should only contain a 4-element array`;
    }

    // check tuple's length
    if (tuple.length != 4) {
      throw `i18n array contains a non 4-element array`;
    }

    // check first and second element's type
    if (typeof tuple[0] !== 'string') {
      throw `${tuple[0]}(1st element) is not a string`;
    }
    if (typeof tuple[1] !== 'string') {
      throw `${tuple[1]}(2nd element) is not a string`;
    }

    // check third and fourth element's type
    if (typeof tuple[2] !== 'string' && tuple[2] !== null) {
      throw `${tuple[2]}(3rd element) can only be string or null`;
    }
    if (typeof tuple[3] !== 'string' && tuple[3] !== null) {
      throw `${tuple[3]}(4th element) can only be string or null`;
    }
  });
}

const akiFeatures = getMapping(mappingAki, i18nAki);
const sepsisFeatures = getMapping(mappingSepsis, i18nSepsis);
const miFeatures = getMapping(mappingMi, i18nMi);
const vancomycinFeatures = getMapping(mappingVancomycin, i18nVancomycin);

// generate output mappings
[
  ['./src/app/sepsis/mapping.json', sepsisFeatures],
  ['./src/app/mi/mapping.json', miFeatures],
  ['./src/app/vancomycin/mapping.json', vancomycinFeatures],
  ['./src/app/aki/mapping.json', akiFeatures],
].forEach(([path, features]) => {
  fs.writeFileSync(path, JSON.stringify(features));
});
