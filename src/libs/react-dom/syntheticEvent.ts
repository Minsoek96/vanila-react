import { rootStore } from "@/libs/react-dom/client";

const SPECIAL_EVENT_MAPPINGS = {
  doubleClick: "dblclick",
  change: "input",
} as const;

type EventMappingKey = keyof typeof SPECIAL_EVENT_MAPPINGS;

/**
 * 이벤트 이름을 실제 DOM 이벤트 타입으로 변환
 * @param str - 변환할 이벤트 이름 (예: onClick)
 * @returns 실제 DOM 이벤트 타입 (예: click)
 */
const convertToEventType = (str: string): string => {
  if (!str.startsWith("on")) {
    return str.toLowerCase();
  }
  const eventType = str.slice(2).toLowerCase();
  const standardType = eventType as EventMappingKey;
  return SPECIAL_EVENT_MAPPINGS[standardType] || eventType;
};

type EventHandler = (evnet: Event) => void;

// 이벤트 저장
const eventMap = new Map<string, Map<Element, Set<EventHandler>>>();

/**
 * 이벤트 위임 시스템에 이벤트 핸들러를 등록
 * @param element - 이벤트를 등록할 엘리먼트
 * @param nativeEventType - 이벤트 타입
 * @param handler - 이벤트 함수
 */
function addEventListener(
  element: Element,
  nativeEventType: string,
  handler: EventHandler,
) {
  const { rootElement } = rootStore().get();
  const eventType = convertToEventType(nativeEventType);

  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
    rootElement?.addEventListener(eventType, delegatedEventHandler);
  }

  const elementHandlers = eventMap.get(eventType)!;
  if (!elementHandlers.has(element)) {
    elementHandlers.set(element, new Set());
  }
  elementHandlers.get(element)!.add(handler);
}

/**
 * 이벤트 위임 시스템에 이벤트 핸들러를 제거
 * @param element - 이벤트를 제거할 엘리먼트
 * @param nativeEventType - 이벤트 타입
 */
function removeEventListener(
  element: Element,
  nativeEventType: string,
) {
  const { rootElement } = rootStore().get();
  const eventType = convertToEventType(nativeEventType);

  const elementHandlers = eventMap.get(eventType)?.get(element);
  if (!elementHandlers) {
    return;
  }

  eventMap.delete(eventType);
  rootElement?.removeEventListener(eventType, delegatedEventHandler);
}

/**
 * 네이티브 이벤트를 합성 이벤트로 변환
 * @param nativeEvent - 브라우저의 네이티브 이벤트 객체
 * @param currentNode - 현재 이벤트가 처리되고 있는 엘리먼트
 * @returns 합성 이벤트 객체
 */
function createSyntheticEvent(nativeEvent: Event, currentNode: Element) {
  return {
    ...nativeEvent,
    currentTarget: currentNode,
    target: nativeEvent.target,
    preventDefault() {
      nativeEvent.preventDefault();
    },
    stopPropagation() {
      nativeEvent.stopPropagation();
    },
  };
}

/**
 * 루트 에서 이벤트를 위임받아 처리하는 핸들러
 * 버블링을 통해 상위로 전파하며 등록된 핸들러들을 실행
 */
function delegatedEventHandler(nativeEvent: Event) {
  let currentNode = nativeEvent.target as Element;
  const eventType = nativeEvent.type;
  const handlers = eventMap.get(eventType);

  if (!handlers) {
    return;
  }

  while (currentNode) {
    const elementHandlers = handlers.get(currentNode);
    if (elementHandlers) {
      const syntheticEvent = createSyntheticEvent(nativeEvent, currentNode);
      elementHandlers.forEach((handler) => handler(syntheticEvent));
    }
    currentNode = currentNode.parentElement!;
  }
}

export { addEventListener, removeEventListener };
