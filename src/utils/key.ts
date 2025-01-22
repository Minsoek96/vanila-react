/**
 * getUniqueId
 *
 * timestamp와 랜덤 문자열을 조합하여 고유한 ID를 생성
 */
export const getUniqueId = (prefix?: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const uniqueId = `${timestamp}_${random}`;
  return prefix ? `${prefix}_${uniqueId}` : uniqueId;
};
