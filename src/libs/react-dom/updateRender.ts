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

//TODO : 방향성 설계 OK
//남은 파트 어떻게 처리 할 것인가
const compareAttrHandlers: CompareHandlers = {
  children: (oldChild: RenderVNode[], newChild: RenderVNode[], parentEl) => {
    for (let i = 0; i < Math.max(oldChild.length, newChild.length); i++) {
      const currentChild = parentEl.childNodes[i];

      switch (getChildUpdateType(oldChild[i], newChild[i])) {
      case "ADD":
        console.log("새로운 자식 노드 추가");
        break;
      case "REMOVE":
        console.log(parentEl);
        console.log("기존 자식 노드 제거");
        break;
      case "NEXT_CHILD":
        console.log("자식 노드 업데이트:", currentChild);
      }
    }
  },

  style: (oldStyle, newStyle, parentEl) => {
    console.log(parentEl);
    console.log(oldStyle, "oldStyle");
    console.log(newStyle, "newStyle");
  },

  default: (oldName, newName, parentEl) => {
    console.log(parentEl);
    console.log(oldName, "oldStyle");
    console.log(newName, "newStyle");
  },
};

//TOOD : 업데이트 렌더에 대한 구현 생각해보기
// 어떻게 parentNode를 순회할까 ? clear
export function updateRender(
  oldNode: RenderVNode,
  newNode: RenderVNode,
  parentEl: HTMLElement,
) {
  console.log(oldNode);
  if (oldNode.type !== newNode.type) {
    const newEl = renderVNode(newNode);
    parentEl.innerHTML = "";
    parentEl.append(newEl);
    return;
  }

  const oldProps = oldNode?.props ?? {};
  const newProps = newNode?.props ?? {};
  // newProps = { ...oldProps, className: "sadf sadff sadfsaf" };

  Object.entries(newProps).forEach(([key, newValue]) => {
    console.log(parentEl);
    console.log(newProps);
    const originKey = key;
    if (key.startsWith("on")) {
      key = "addEvent";
    }

    const isNewAttribute = !oldProps[key];
    if (isNewAttribute) {
      //TODO: createAttrHandler 없던 것을 새로 생성하는 느낌.
      //reconcileHandlers vs  compareAttrHandlers.....
      //재조정? 비교/ 업데이트/ 삭제의 함축적 표현
      // but updateRender 의 목적이 이미 재조정 인데 흠
      //단순 비교 ??
      const createAttrHandler =
        attributeHandlers[key] || attributeHandlers.default;
      createAttrHandler(newValue, parentEl, key, originKey);
      console.log("oldNode에 없는 새로운 키.", key, newValue);
    } else {
      const reconcileHandlers =
        compareAttrHandlers[key] || compareAttrHandlers.default;
      reconcileHandlers(oldProps[key] as string, newValue as string, parentEl);
    }
  });
}
