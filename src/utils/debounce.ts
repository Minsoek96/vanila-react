/**
 * 지정된 시 동안 함수 호출을 지연시키는 함수
 * @param fn - 실행할 함수
 * @param delay - 지연 시간 (밀리초)
 * @returns
 */
function debounce(fn: () => void, delay: number) {
  let timeoutId: number | undefined;
  return () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(fn, delay);
  };
}

export { debounce };
