/**
 * isNullish
 *
 * 값이 undefined 또는 null 인지 체크
 * @returns {boolean}
 */
const isNullish = (value: unknown): boolean =>
  value === undefined || value === null;

/**
 * isStringOrNumber
 *
 * 값이 문자열 또는 숫자 인지 체크
 * @returns {value is string | number}
 */
const isStringOrNumber = (value: unknown): value is string | number =>
  typeof value === "string" || typeof value === "number";

export { isNullish, isStringOrNumber };
