import { useState } from "@/libs/hooks";

interface Child {
  id: number;
  name: string;
  createdAt: Date;
  content: string;
}
export default function RenderTest() {
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
      <div>df</div>
      <div>sdd</div>
      <p>{text}</p>
      <input
        value={text}
        onChange={handleChange}
        placeHolder={"입력해주세요"}
      />
      <button onClick={handleClick}>Add Child</button>
      {children.map((child) => {
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
