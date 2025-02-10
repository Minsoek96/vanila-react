/**
 * camelCase를 kebab-case로 변환
 * fontSize -> font-size
 */
const camelToKebab = (str: string): string => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};


const normalizeToArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value];

export { camelToKebab, normalizeToArray };
