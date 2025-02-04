/* eslint-disable curly */
import { attributeHandlers, renderVNode } from "@/libs/react-dom/client";
import { addEventListener, removeEventListener } from "./syntheticEvent";

import { RenderVNode } from "@/libs/types";
import {
  camelToKebab,
  isNullish,
  isStringOrNumber,
  normalizeToArray,
} from "@/utils";

type DOMEventHandler = (event: Event) => void;

type CompareHandler<T = unknown> = (
  oldValue: T,
  newValue: T,
  parentEl: HTMLElement | DocumentFragment,
  key?: string
) => void;

type CompareHandlers = {
  [key: string]: CompareHandler<any>;
  children: CompareHandler<RenderVNode[]>;
  style: CompareHandler;
  default: CompareHandler;
};

/**
 * handleStyleUpdate
 *
 * DOM 엘리먼트의 스타일 속성을 업데이트하는 함수
 * 이전 스타일과 새로운 스타일을 비교하여 변경사항을 적용
 *
 * @param oldStyle - camelCase로 작성된 이전 스타일 객체
 * @param newStyle - camelCase로 작성된 새로운 스타일 객체
 * @param element - 업데이트할 대상 DOM 엘리먼트
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

/**
 * compareAttrHandlers
 *
 * 다양한 속성 타입에 대한 비교 및 업데이트 처리 핸들러
 * children, style, input value, 이벤트 등 각각의 특수한 경우를 처리
 */
const compareAttrHandlers: CompareHandlers = {
  children: (oldChild: RenderVNode[], newChild: RenderVNode[], parentEl) => {
    const oldChildArray = normalizeToArray(oldChild);
    const newChildArray = normalizeToArray(newChild);
    const currentChildren = Array.from(parentEl.childNodes);
    const maxLength = Math.max(oldChildArray.length, newChildArray.length);

    for (let i = 0; i < maxLength; i++) {
      const oldChildItem = oldChildArray[i];
      const newChildItem = newChildArray[i];
      const currentChild = currentChildren[i];

      if (isStringOrNumber(newChildItem)) {
        if (oldChildItem !== newChildItem && currentChild) {
          currentChild.textContent = String(newChildItem);
          continue;
        }
      }

      if (newChildItem && isNullish(currentChild)) {
        const newElement = renderVNode(newChildItem);
        parentEl.appendChild(newElement);
        continue;
      }

      if (isNullish(newChildItem) && currentChild) {
        parentEl.removeChild(currentChild);
        continue;
      }

      if (newChildItem && currentChild) {
        updateRender(oldChildItem, newChildItem, currentChild as HTMLElement);
      }
    }
  },

  style: (oldStyle, newStyle, parentEl) => {
    handleStyleUpdate(
      oldStyle as Record<string, string>,
      newStyle as Record<string, string>,
      parentEl as HTMLElement,
    );
  },

  value: (oldValue, newValue, parentEl) => {
    if (parentEl instanceof HTMLInputElement && oldValue !== newValue) {
      parentEl.setAttribute("value", newValue);
    }
  },

  updateEvent: (oldHandler, newHandler, parentEl, key) => {
    if (!(parentEl instanceof HTMLElement) || !key) {
      return;
    }

    if (oldHandler) {
      removeEventListener(parentEl, key, oldHandler);
    }
    if (newHandler) {
      addEventListener(parentEl, key, newHandler);
    }
  },

  default: (oldName, newName, parentEl) => {
    if (!(parentEl instanceof HTMLElement)) return;
    if (newName) {
      parentEl.removeAttribute(String(oldName));
    } else if (oldName !== newName) {
      parentEl.setAttribute(String(oldName), String(newName));
    }
  },
};

/**TODO :
 *
 * 1. 전체적 코드 정리 필요
 * 2. 일부 케이스에서 useState -> state 반환이 최신 반영 안되는 문제
 *
 * 해결 된 것
 * 1. 아이템 추가의 경우도 일단은 OK
 * 2. 글자 업데이트 OK
 * 3. 스타일 재조정 OK
 * 4. undefined 태그 문제 OK
 * 5. 카운터의 경우 정상 동작하지만, 내부 반환 값 불일치로 미작동 문제 (이벤트 최신화로 추정됨) Ok
 * 6. 삭제가 이상하게 동작하는 문제 ok props: {} props: {children: []}
 * 7. getChildUpdateType 코드는 길어져도 명확한 느낌
 * 8. 특정 케이스의 경우 스타일 변화 문제 (없던 속성이 생겨나는것은 드문 케이스지만 boolean ? <A/> : <B/>)
 * */

/**
 * updateRender
 * 가상 DOM 재조정(Reconciliation)
 *
 * 부모 레벨에서 노드 타입 비교 및 교체 결정
 * 속성과 자식의 실제 비교는 compareAttrHandlers에 위임
 *
 * @param oldNode - 이전 가상 DOM 노드
 * @param newNode - 새로운 가상 DOM 노드
 * @param parentEl - 업데이트할 대상 DOM 엘리먼트
 */
export function updateRender(
  oldNode: RenderVNode,
  newNode: RenderVNode,
  parentEl: HTMLElement,
) {
  // 텍스트 노드 업데이트 처리
  if (isStringOrNumber(newNode)) {
    if (oldNode !== newNode) {
      parentEl.nodeValue = String(newNode);
    }
    return;
  }

  // 엘리먼트 타입이 변경된 경우 전체 교체
  if (oldNode.type !== newNode.type) {
    const newEl = renderVNode(newNode);
    parentEl.replaceWith(newEl);
    return;
  }

  const oldProps = oldNode?.props ?? {};
  const newProps = newNode?.props ?? {};
  const allProps = { ...oldProps, ...newProps };

  // 속성 업데이트 처리
  Object.entries(allProps).forEach(([key, value]) => {
    const originKey = key;
    if (key.startsWith("on")) {
      key = "updateEvent";
    }

    const isNewAttriute = !(originKey in oldProps);
    if (isNewAttriute && originKey !== "children") {
      const createAttributeHandlers =
        attributeHandlers[originKey] || attributeHandlers.default;
      createAttributeHandlers(value, parentEl, key, originKey);
      return;
    }

    const reconcileHandlers =
      compareAttrHandlers[key] || compareAttrHandlers.default;
    reconcileHandlers(
      oldProps[originKey] as string,
      newProps[originKey] as string,
      parentEl,
      originKey,
    );
  });

  // 제거된 속성 삭제
  Object.keys(oldProps).forEach((key) => {
    if (!(key in newProps) && key !== "children") {
      if (key.startsWith("on")) {
        const eventType = key;
        removeEventListener(
          parentEl,
          eventType,
          oldProps[key] as DOMEventHandler,
        );
      } else {
        parentEl.removeAttribute(key);
      }
    }
  });
}
