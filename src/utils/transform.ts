/**
 * camelCase를 kebab-case로 변환
 * fontSize -> font-size
 */
const camelToKebab = (str: string): string => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};

export { camelToKebab };
