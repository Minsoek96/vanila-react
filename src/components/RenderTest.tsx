import { useState } from "@/libs/hooks";

export default function RenderTest() {
  const [value, setValue] = useState<number>(0);
  const getTime = new Date().getTime();
  return (
    <div onClick={() => setValue(value + 1)}>
      <div>값:{value}</div>
      <span>{getTime}</span>
    </div>
  );
}
