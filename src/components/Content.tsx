import { useState } from "@/libs/hooks";

type CountType = "main" | "sub";

interface CountDisplayProps {
  label: string;
  count: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const CountDisplay = ({
  label,
  count,
  onDecrease,
  onIncrease,
}: CountDisplayProps) => (
  <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
    <button
      onClick={onDecrease}
      style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
    >
      Decrease
    </button>
    <button
      onClick={onIncrease}
      style={{ padding: "0.5rem 1rem", marginRight: "1rem" }}
    >
      Increase
    </button>
    <span style={{ fontSize: "1.1rem" }}>
      {label}: {count}
    </span>
  </div>
);

export default function Content() {
  const [count, setCount] = useState(0);
  const [subCount, setSubCount] = useState(0);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
    setSubCount((prev) => prev + 3);
  };

  const handleDecrease = (type: CountType) => {
    // TODO : 현재 갱신이 count를 추적 하지 못하는 문제가 있음
    // useState가 반환하는 store.states[hookIdx]의 값이 갱신 되지 못하는 문제
    // if (type === "main" && count < 1) return;
    // if (type === "sub" && subCount < 1) return;

    setCount((prev) => (prev <= 0 ? prev : prev - 1));
    setSubCount((prev) => (prev <= 0 ? prev : prev - 3));
  };

  const handleClear = () => {
    setCount(0);
    setSubCount(0);
  };

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column" }}>
      <h1
        style={{
          color: "red",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Hello Babel Test
      </h1>

      <CountDisplay
        label="Main"
        count={count}
        onDecrease={() => handleDecrease("main")}
        onIncrease={handleIncrease}
      />

      <CountDisplay
        label="Sub"
        count={subCount}
        onDecrease={() => handleDecrease("sub")}
        onIncrease={handleIncrease}
      />
      <button
        onclick={handleClear}
        style={{ padding: "0.5rem 1rem", marginRight: "1rem", width: '15rem' }}
      >
        clear
      </button>

      <p style={{ color: "#666" }}>transformation</p>
    </div>
  );
}
