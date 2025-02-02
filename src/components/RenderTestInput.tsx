import { useEffect, useState } from "@/libs/hooks";

interface Child {
  id: number;
  name: string;
  createdAt: Date;
  content: string;
}

/**
 * RenderTestInput
 *
 * 1. Input 입력값 반영 테스트
 * 2. 실시간 변화 값 테스트
 */
export default function RenderTestInput() {
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<Child[]>([
    {
      id: 1,
      name: "Child",
      createdAt: new Date(),
      content: "first child content",
    },
  ]);

  const handleChange = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    setText(value);
  };

  const handleClick = () => {
    const newChild: Child = {
      id: Date.now(),
      name: `Child-${data.length + 1}`,
      createdAt: new Date(),
      content: text.trim() || `Default content ${data.length + 1}`,
    };
    setData((prev) => [...prev, newChild]);
    setText("");
  };

  useEffect(() => {
    console.log("Effect 실행", text);
    return () => {
      console.log("종료: text =", text);
    };
  }, [text]);

  return (
    <div>
      {"붕붕붕붕"}
      <p>{text}</p>
      <input
        value={text}
        onChange={handleChange}
        placeHolder={"입력해주세요"}
      />
      <h2>{data.length}</h2>
      <button onClick={handleClick}>Add Child</button>
      {data.length > 0 &&
        data.map((child) => {
          return (
            <div key={child.id}>
              <h3>{child.name}</h3>
              <p>{child.content}</p>
              <small>Created: {child.createdAt.toLocaleString()}</small>
            </div>
          );
        })}
    </div>
  );
}
