import {
  beingIdentifiers,
  existentialIdentifiers,
  genderIdentifiers,
} from '../constants';

export function format(
  identifier: string,
  group: string,
  value: number
): string {
  if (genderIdentifiers.has(identifier)) {
    return formatGender(value);
  }

  if (beingIdentifiers.has(identifier)) {
    return formatBooleanIs(value);
  }

  if (existentialIdentifiers.has(identifier)) {
    return formatBooleanHave(value);
  }

  if (identifier === 'temperature (f)' && value !== 0) {
    return formatReal(toCelsius(value));
  }

  if (group === 'medications') {
    return formatBooleanHave(value);
  }

  return formatReal(value);
}

function formatReal(value: number): string {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  if (Number.isInteger(value * 10)) {
    return Number(value).toFixed(1);
  }

  return Number(value).toFixed(2);
}

function formatGender(value: number): string {
  return value === 1 ? '男' : value === 0 ? '女' : formatReal(value);
}

function formatBooleanHave(value: number): string {
  return value === 1 ? '有' : value === 0 ? '无' : formatReal(value);
}

function formatBooleanIs(value: number): string {
  return value === 1 ? '是' : value === 0 ? '否' : formatReal(value);
}

function toCelsius(value: number): number {
  return (value - 32) * (5 / 9);
}
