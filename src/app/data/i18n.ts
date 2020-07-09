import { I18nTuple, I18nVM } from './types';

import i18nFromMi from './mi/i18n';
import i18nFromSepsis from './sepsis/i18n';
import i18nFromVancomycin from './vancomycin/i18n';

export const i18nMi = i18nFromMi.map(process);
export const i18nSepsis = i18nFromSepsis.map(process);
export const i18nVancomycin = i18nFromVancomycin.map(process);

function process(tuple: I18nTuple): I18nVM {
  const [, zh, , unit] = tuple;
  const label = zh;

  return { label, unit };
}
