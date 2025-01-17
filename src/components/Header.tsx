export default function Header() {
  const MENU_ITEMS = ["first", "second", "third"] as const;

  const handleClick = (item: string) => {
    alert(item);
  };

  return (
    <header style={{ background: "#fff", padding: "1rem" }}>
      <div style={{ fontSize: "3rem", fontWeight: "bold" }}>1</div>
      <div style={{ color: "#666" }}>2</div>
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
                color: index === 1 ? "red" : "black",
                fontWeight: index === 1 ? "bold" : "normal",
                fontSize: `${16 + index * 2}px`,
              }}
            >
              <span onClick={() => handleClick(item)}>{item}</span>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
