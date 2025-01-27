/* eslint-disable curly */
import { attributeHandlers, renderVNode } from "@/libs/react-dom/client";

import { RenderVNode } from "@/libs/types";

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

const getChildUpdateType = (
  oldChild: unknown,
  newChild: unknown,
): ChildUpdateType => {
  if (!oldChild) return "ADD";
  if (!newChild) return "REMOVE";
  return "NEXT_CHILD";
};

function isPrimitive(value: unknown): value is string | number {
  return typeof value === "string" || typeof value === "number";
}
//TODO : 방향성 설계 OK
//남은 파트 어떻게 처리 할 것인가
const compareAttrHandlers: CompareHandlers = {
  children: (oldChild: RenderVNode[], newChild: RenderVNode[], parentEl) => {
    console.log(oldChild, "오래된 자식");
    console.log(newChild, "새로운  자식");
    if (!Array.isArray(newChild)) {
      if (oldChild !== newChild) {
        console.log("새로운 값을 추가?", newChild)
        parentEl.textContent = String(newChild);
      }
      return;
    }

    for (let i = 0; i < Math.max(oldChild.length, newChild.length); i++) {
      const currentChild = parentEl.childNodes[i];
      updateRender(oldChild[i], newChild[i], currentChild as HTMLElement);
    }
  },

  style: (oldStyle, newStyle, parentEl) => {
    // console.log(parentEl);
    // console.log(oldStyle, "oldStyle");
    // console.log(newStyle, "newStyle");
  },

  value: (oldValue, newValue, parentEl) => {
    console.log("벨류 체인지");
    if (parentEl instanceof HTMLInputElement && oldValue !== newValue) {
      console.log("조건 통과", newValue);
      parentEl.value = String(newValue);
    }
  },

  default: (oldName, newName, parentEl) => {
    // console.log(parentEl);
    // console.log(oldName, "oldStyle");
    // console.log(newName, "newStyle");
  },
};

//TOOD : 업데이트 렌더에 대한 구현 생각해보기
// 어떻게 parentNode를 순회할까 ? clear
export function updateRender(
  oldNode: RenderVNode,
  newNode: RenderVNode,
  parentEl: HTMLElement,
) {
  console.log("오래된 노드", oldNode);
  console.log("새로운 노드", newNode);
  if (oldNode.type !== newNode.type) {
    const newEl = renderVNode(newNode);
    parentEl.innerHTML = "";
    parentEl.append(newEl);
    return;
  }

  if (typeof newNode === "string" || typeof newNode === "number") {
    if (oldNode !== newNode) {
      // text 노드 업데이트 nodeValue를 사용해야함
      // textContent 는 모든걸 덮어버림;
      parentEl.nodeValue = String(newNode);
    }
    return;
  }

  const oldProps = oldNode?.props ?? {};
  const newProps = newNode?.props ?? {};

  Object.entries(newProps).forEach(([key, newValue]) => {
    console.log(newValue, "다 뽑아", key);
    const originKey = key;
    if (key.startsWith("on")) {
      key = "addEvent";
    }

    const isNewAttribute = !(originKey in oldProps);
    if (isNewAttribute) {
      //TODO: createAttrHandler 없던 것을 새로 생성하는 느낌.
      //reconcileHandlers vs  compareAttrHandlers.....
      //재조정? 비교/ 업데이트/ 삭제의 함축적 표현
      // but updateRender 의 목적이 이미 재조정 인데 흠
      //단순 비교 ??

      //완전히 새롭게 생성된 속성
      console.log(
        "새롭게 생성된 속성?",
        newValue,
        key,
        "경계선",
        oldProps[originKey],
      );
      const createAttrHandler =
        attributeHandlers[key] || attributeHandlers.default;
      createAttrHandler(newValue, parentEl, key, originKey);
    } else {
      const reconcileHandlers =
        compareAttrHandlers[key] || compareAttrHandlers.default;
      console.log("그래서 어디?", newValue);
      //일단은 존재하는 속성 비교 조정
      reconcileHandlers(
        oldProps[originKey] as string,
        newValue as string,
        parentEl,
      );
    }
  });
}
