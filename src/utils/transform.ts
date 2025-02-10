/**
 * camelCase를 kebab-case로 변환
 * fontSize -> font-size
 */
const camelToKebab = (str: string): string => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};

//TODO : diff를 구현 후에 이벤트 합성에 대해서 생각해보기
// ex : Change : 'input'
const SPECIAL_EVENT_MAPPINGS = {
  doubleClick: "dblclick",
  change: "input",
} as const;

type EventMappingKey = keyof typeof SPECIAL_EVENT_MAPPINGS;

/**
 * on 접두사를 제거하고 이벤트 타입으로 변환
 * onClick -> click
 * onDubleClick - dblclick
 */
const convertToEventType = (str: string): string => {
  if (!str.startsWith("on")) {
    return str.toLowerCase();
  }
  const eventType = str.slice(2).toLowerCase();
  const standardType = eventType as EventMappingKey;
  return SPECIAL_EVENT_MAPPINGS[standardType] || eventType;
};

const normalizeToArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value];

export { camelToKebab, convertToEventType, normalizeToArray };
