import { useState } from "@/libs/hooks";

export default function Content() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((value) => value + 1);
    console.log(count, "컴포넌트");
  };

  const handleDecrease = () => {
    if(count < 1) return
    setCount((value) => value - 1);
  }

  return (
    <div className="content">
      {count}
      <h1>Hello Babel Test</h1>
      <button onClick = {handleDecrease}>Decrease</button>
      <button onClick = {handleIncrease}>Increase</button>
      <p>transformation</p>
    </div>
  );
}
