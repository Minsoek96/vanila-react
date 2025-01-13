export default function Header() {
  const MENU_ITEMS = ["first", "second", "third"] as const;
  
  return (
    <header>
      <div>1</div>
      <div>2</div>
      {MENU_ITEMS.map((item, index) => {
        return (
          <div key={`${item}-${index}`}>
            <p>{item}</p>
          </div>
        );
      })}
    </header>
  );
}
