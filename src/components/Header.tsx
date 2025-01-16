export default function Header() {
  const MENU_ITEMS = ["first", "second", "third"] as const;

  return (
    <header>
      <div>1</div>
      <div>2</div>
      <ul>
        {MENU_ITEMS.map((item, index) => {
          return (
            <li key={`${item}-${index}`}>
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
