import { useState } from "@/libs/hooks";

export default function NavBar() {
  const [cur, setCur] = useState<boolean>(false);
  const handleButton = (e:Event) => {
    e.stopPropagation();
    setCur((prev) => !prev);
    console.log(cur, "cur 값");
  };
  return (
    <nav>
      <ul onClick={handleButton}>clickMe!</ul>
      네비
    </nav>
  );
}
