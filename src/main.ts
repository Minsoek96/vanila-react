/* eslint-disable no-console */
import { createElement } from "./libs/jsx";
import { Element } from "./Test";

const A = () => createElement("div", null, "first");

const B = Element();

const Test = createElement(
  "div",
  { className: "test" },
  createElement(A, null),
  createElement("div", null, createElement("h1", null, "Hello Babel Test")),
  createElement("p", null, "transformation"),
);

const element = Test;

console.log(JSON.stringify(element, null, 2));
console.log(B);
