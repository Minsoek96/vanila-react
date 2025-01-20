import { useState } from "@/libs/hooks";

export default function Header() {
  const [currentItem, setCurrentItem] = useState(0);
  const [text, setText] = useState<string>("무");
  const MENU_ITEMS = ["first", "second", "third"] as const;

  const handleClick = (item: number) => {
    setCurrentItem(item);
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setText(target.value);
  };

  return (
    <header style={{ background: "#fff", padding: "1rem" }}>
      <div style={{ fontSize: "3rem", fontWeight: "bold" }}>1</div>
      <div style={{ color: "#666" }}>2+3 : {2 + 3}</div>
      <h2>{text}</h2>
      <input
        placeholder="dddd"
        onChange={(e: Event) => handleChange(e)}
        value={text}
      >
        ddd
      </input>
      <ul
        style={{
          display: "flex",
          gap: "2rem",
          listStyle: "none",
          margin: "10px 0",
          padding: 0,
        }}
      >
        {MENU_ITEMS.map((item, index) => {
          return (
            <li
              key={`${item}-${index}`}
              style={{
                padding: "8px 16px",
                backgroundColor: "#fff",
                border: "1px solid blue",
                borderRadius: "8px",
                cursor: "pointer",
                color: index === currentItem ? "red" : "black",
                fontWeight: index === currentItem ? "bold" : "normal",
                fontSize: `${16 + index * 2}px`,
              }}
            >
              <span onClick={() => handleClick(index)}>{item}</span>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
