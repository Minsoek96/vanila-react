import { resetStore } from "@/libs/hooks";

let isUpdating = false;
const updateQueue = new Set<() => void>();

/**
 * batchUpdate
 *
 * 여러 상태 업데이트를 일괄적으로 처리하는 함수
 * @param update - 실행할 업데이트 함수
 */
export function batchUpdate(update: () => void) {
  updateQueue.add(update);
  if (!isUpdating) {
    isUpdating = true;

    Promise.resolve().then(() => {
      updateQueue.forEach((update) => update());
      updateQueue.clear();
      resetStore();
      isUpdating = false;
    });
  }
}
