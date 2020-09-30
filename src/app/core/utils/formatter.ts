const booleanGenderIdentifiers = new Set(['m', 'gender']);
const booleanIsIdentifiers = new Set(['black']);
const booleanHaveIdentifiers = new Set(['tobacco', 'diabetes']);

export function format(
  identifier: string,
  group: string,
  value: number
): string {
  if (booleanGenderIdentifiers.has(identifier)) {
    return formatGender(value);
  }

  if (booleanIsIdentifiers.has(identifier)) {
    return formatBooleanIs(value);
  }

  if (booleanHaveIdentifiers.has(identifier)) {
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

  return Number(value).toFixed(2);
}

function formatGender(value: number): string {
  return value === 1 ? '男' : '女';
}

function formatBooleanHave(value: number): string {
  return value === 1 ? '有' : '无';
}

function formatBooleanIs(value: number): string {
  return value === 1 ? '是' : '否';
}

function toCelsius(value: number): number {
  return (value - 32) * (5 / 9);
}
