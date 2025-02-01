import { rootStore } from "@/libs/react-dom/client";

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

type EventHandler = (evnet: Event) => void;

const eventMap = new Map<string, Map<Element, Set<EventHandler>>>();

/**
 * 
 * @param element 
 * @param nativeEventType 
 * @param handler 
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
    rootElement?.addEventListener(eventType, rootEventHandler);
  }

  const elementHandlers = eventMap.get(eventType)!;
  if (!elementHandlers.has(element)) {
    elementHandlers.set(element, new Set());
  }
  elementHandlers.get(element)!.add(handler);
}

function removeEventListener(
  element: Element,
  nativeEventType: string,
  handler: EventHandler,
) {
  const { rootElement } = rootStore().get();
  const eventType = convertToEventType(nativeEventType);

  const elementHandlers = eventMap.get(eventType)?.get(element);
  if (!elementHandlers) {
    return;
  }

  elementHandlers.delete(handler);

  if (elementHandlers.size === 0) {
    eventMap.get(eventType)?.delete(element);
  }
  if (eventMap.get(eventType)?.size === 0) {
    eventMap.delete(eventType);
    rootElement?.removeEventListener(eventType, rootEventHandler);
  }
}

function rootEventHandler(nativeEvent: Event) {
  let currentNode = nativeEvent.target as Element;
  const eventType = nativeEvent.type;
  const handlers = eventMap.get(eventType);

  if (!handlers) {
    return;
  }

  while (currentNode) {
    const elementHandlers = handlers.get(currentNode);
    if (elementHandlers) {
      elementHandlers.forEach((handler) => {
        handler({
          ...nativeEvent,
          currentTarget: currentNode,
          target: nativeEvent.target,
        });
      });
    }
    currentNode = currentNode.parentElement!;
  }
}

export { addEventListener, removeEventListener }