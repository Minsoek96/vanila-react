/* eslint-disable curly */
import { attributeHandlers, renderVNode } from "@/libs/react-dom/client";

import { RenderVNode } from "@/libs/types";
import { camelToKebab, convertToEventType } from "@/utils";

type DOMEventHandler = (event: Event) => void;

type CompareHandler<T = unknown> = (
  oldValue: T,
  newValue: T,
  parentEl: HTMLElement | DocumentFragment
) => void;

type CompareHandlers = {
  [key: string]: CompareHandler<any>;
  children: CompareHandler<RenderVNode[]>;
  style: CompareHandler;
  default: CompareHandler;
};

type ChildUpdateType = "ADD" | "REMOVE" | "NEXT_CHILD";

/**
 * style 속성 업데이트 처리
 * (fontSize -> font-size)
 */
function handleStyleUpdate(
  oldStyle: Record<string, string>,
  newStyle: Record<string, string>,
  element: HTMLElement,
) {
  if (!oldStyle || !newStyle) return;

  // 제거된 스타일 처리
  Object.keys(oldStyle).forEach((key) => {
    if (!(key in newStyle)) {
      element.style.removeProperty(camelToKebab(key));
    }
  });

  // 새로운/변경된 스타일 적용
  Object.entries(newStyle).forEach(([key, value]) => {
    if (oldStyle[key] !== value) {
      element.style.setProperty(camelToKebab(key), value);
    }
  });
}

const getChildUpdateType = (
  oldChild: unknown,
  newChild: unknown
): ChildUpdateType => {
  if (!oldChild && newChild) {
    return "ADD";
  }
  if (oldChild && !newChild) {
    return "REMOVE";
  }
  return "NEXT_CHILD";
};

function isPrimitive(value: unknown): value is string | number {
  return typeof value === "string" || typeof value === "number";
}
//TODO : 방향성 설계 OK
//남은 파트 어떻게 처리 할 것인가
const compareAttrHandlers: CompareHandlers = {
  children: (oldChild: RenderVNode[], newChild: RenderVNode[], parentEl) => {
    const oldChildArray = Array.isArray(oldChild) ? oldChild : [oldChild];
    const newChildArray = Array.isArray(newChild) ? newChild : [newChild];
    const currentChildren = Array.from(parentEl.childNodes);
    const maxLength = Math.max(oldChildArray.length, newChildArray.length);

    for (let i = 0; i < maxLength; i++) {
      const oldChildItem = oldChildArray[i];
      const newChildItem = newChildArray[i];
      const currentChild = currentChildren[i];

      if (isPrimitive(oldChildItem) || isPrimitive(newChildItem)) {
        if (oldChildItem !== newChildItem && currentChild) {
          currentChild.textContent = String(newChildItem);
          continue;
        }
      }

      const updateType = getChildUpdateType(oldChildItem, newChildItem);

      if (updateType === "ADD") {
        const newElement = renderVNode(newChildItem);
        parentEl.appendChild(newElement);
        continue;
      }

      if (updateType === "REMOVE") {
        parentEl.removeChild(currentChild);
        continue;
      }

      if (updateType === "NEXT_CHILD") {
        updateRender(oldChildItem, newChildItem, currentChild as HTMLElement);
      }
    }
  },

  style: (oldStyle, newStyle, parentEl) => {
    handleStyleUpdate(oldStyle, newStyle, parentEl);
  },

  value: (oldValue, newValue, parentEl) => {
    if (parentEl instanceof HTMLInputElement && oldValue !== newValue) {
      parentEl.setAttribute("value", newValue);
    }
  },

  default: (oldName, newName, parentEl) => {
    // console.log(parentEl);
    // console.log(oldName, "oldStyle");
    // console.log(newName, "newStyle");
  },
};

/**TODO :
 *
 * 1. 삭제가 이상하게 동작하는 문제
 * 2. 카운터의 경우 정상 동작하지만, 내부 반환 값 불일치로 미작동 문제 (이벤트 최신화로 추정됨)
 * 3. getChildUpdateType이 오히려 더 복잡한 느낌 ?
 * 4. 전체적 코드 정리 필요
 *
 * 1. 아이템 추가의 경우도 일단은 OK 
 * 2. 글자 업데이트 OK
 * 3. 스타일 재조정 OK
 * 4. undefined 태그 문제 OK
 * */
export function updateRender(
  oldNode: RenderVNode,
  newNode: RenderVNode,
  parentEl: HTMLElement,
) {
  // 텍스트 노드에 대한 처리
  if (isPrimitive(newNode)) {
    if (oldNode !== newNode) {
      // text 노드 업데이트 nodeValue를 사용해야함
      // textContent 는 모든걸 덮어버림;
      parentEl.nodeValue = String(newNode);
    }
    return;
  }

  // 완전 다른 타입의 경우
  if (oldNode.type !== newNode.type) {
    const newEl = renderVNode(newNode);
    parentEl.innerHTML = "";
    parentEl.append(newEl);
    return;
  }

  const oldProps = oldNode?.props ?? {};
  const newProps = newNode?.props ?? {};

  Object.entries(newProps).forEach(([key, newValue]) => {
    const originKey = key;
    if (key.startsWith("on")) {
      key = "addEvent";
    }

    const isNewAttribute = !(originKey in oldProps);
    if (isNewAttribute) {
      // 새로운 속성에 대한 추가
      const createAttrHandler =
        attributeHandlers[key] || attributeHandlers.default;
      createAttrHandler(newValue, parentEl, key, originKey);
    } else {
      // 재조정이 필요한 속성에 대한 절치치
      const reconcileHandlers =
        compareAttrHandlers[key] || compareAttrHandlers.default;
      reconcileHandlers(
        oldProps[originKey] as string,
        newValue as string,
        parentEl
      );
    }
  });

  // 제거된 속성 삭제
  Object.keys(oldProps).forEach((key) => {
    if (!(key in newProps)) {
      if (key.startsWith("on")) {
        const eventName = convertToEventType(key);
        parentEl.removeEventListener(
          eventName,
          oldProps[key] as DOMEventHandler
        );
      } else {
        parentEl.removeAttribute(key);
      }
    }
  });
}
