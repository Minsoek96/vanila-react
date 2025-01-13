/** @jsx createElement */
import { createElement } from "./libs/jsx";

export const Element = () => {
  return (
    <div className="test">
      <h1>
        Hello Babel Test
        <p>[]</p>
      </h1>
      <p>transformation</p>
      <p>
        <div>
          <div>Depth</div>
        </div>
      </p>
    </div>
  );
};
