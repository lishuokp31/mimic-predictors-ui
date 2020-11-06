const weightBaseColor = '#2196F3';
export const [wr, wg, wb] = [
  parseInt(weightBaseColor.slice(1, 3), 16),
  parseInt(weightBaseColor.slice(3, 5), 16),
  parseInt(weightBaseColor.slice(5, 7), 16),
];

export const nDays = 14;

// used by the feature table to format values correctly
// also used by the editor dialog to display
// the appropriate input widgets
export const genderIdentifiers = new Set(['m', 'gender']);
export const beingIdentifiers = new Set(['black', 'tobacco']);
export const existentialIdentifiers = new Set(['diabetes']);
