import { useState } from "@/libs/hooks";

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
  const [children, setChildren] = useState<Child[]>([
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
      name: `Child-${children.length + 1}`,
      createdAt: new Date(),
      content: text.trim() || `Default content ${children.length + 1}`,
    };
    setChildren((prev) => [...prev, newChild]);
    setText("");
  };

  return (
    <div>
      {"붕붕붕붕"}
      <p>{text}</p>
      <input
        value={text}
        onChange={handleChange}
        placeHolder={"입력해주세요"}
      />
      <h2>{children.length}</h2>
      <button onClick={handleClick}>Add Child</button>
      {children.length > 0 &&
        children.map((child) => {
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
