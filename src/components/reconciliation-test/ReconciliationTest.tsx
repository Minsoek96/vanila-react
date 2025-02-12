import { useEffect, useState } from "@/libs/hooks";

import { PropsWithChildren } from "@/libs/types";
import { styleMixin } from "@/style";

type TestContainerProps = {
  title: string;
};

const TestContainer = ({
  children,
  title,
}: PropsWithChildren<TestContainerProps>) => (
  <div
    style={{
      marginBottom: "1rem",
      border: "1px solid #ccc",
      padding: "1rem",
      width: "100%",
      maxWidth: "50rem",
    }}
  >
    <h3
      style={{
        fontSize: "1.25rem",
        fontWeight: "bold",
        marginBottom: "0.5rem",
      }}
    >
      {title}
    </h3>
    {children}
  </div>
);

type ButtonProps = {
  onClick?: () => void;
  style?: Record<string, string>;
};

const Button = ({
  children,
  style = {},
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    style={{
      padding: "0.5rem 1rem",
      backgroundColor: "#225ab4",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      ...style,
    }}
    {...props}
  >
    {children}
  </button>
);

const StyleTest = () => {
  const [styleToggle, setStyleToggle] = useState(false);

  const handleTogle = () => {
    setStyleToggle((style) => !style);
  };

  return (
    <TestContainer title="1. Style Update Test">
      <div
        style={{
          backgroundColor: styleToggle ? "blue" : "red",
          padding: styleToggle ? "20px" : "10px",
          color: "white",
          transition: "all 0.3s",
        }}
      >
        Style Test
      </div>
      <Button style={{ marginTop: "0.5rem" }} onClick={handleTogle}>
        Toggle Style
      </Button>
    </TestContainer>
  );
};

type ItemProps = {
  id: number;
  title: string;
};

const ChildrenTest = () => {
  const [children, setChildren] = useState<ItemProps[]>([]);

  const handleAdd = () => {
    const id = Date.now();
    const newItem = {
      id,
      title: `Child ${id}`,
    };
    setChildren((prev) => [...prev, newItem]);
  };

  const handleRemove = (targetIndex: number) => {
    const filterItem = children.filter((item) => item.id !== targetIndex);
    setChildren(filterItem);
  };

  return (
    <TestContainer title="2. Add Child/Remove Child">
      <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
        {children.length > 0 && children.map((item, i) => (
          <div
            key={i}
            onClick={() => handleRemove(item.id)}
            style={{
              marginBottom: "0.5rem",
              padding: "0.5rem",
              backgroundColor: "#e2e2e2",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span>{item.title}</span>
            <span style={{ color: "#666", fontSize: "1rem" }}>
              Remove Child
            </span>
          </div>
        ))}
      </div>
      <div style={{ ...styleMixin().flex("", "", "", 5), marginTop: "0.5rem" }}>
        <Button onClick={handleAdd}>Add Child</Button>
      </div>
    </TestContainer>
  );
};

const ConditionalTest = () => {
  const [showComponent, setShowComponent] = useState(true);

  return (
    <TestContainer title="3. Conditional Rendering Test">
      {showComponent ? (
        <div style={{ backgroundColor: "#e48181", padding: "1rem" }}>
          Component A
        </div>
      ) : (
        <div style={{ backgroundColor: "#e55353", padding: "1rem" }}>
          Component B
        </div>
      )}
      <Button
        onClick={() => setShowComponent(!showComponent)}
        style={{ marginTop: "0.5rem" }}
      >
        Toggle Component
      </Button>
    </TestContainer>
  );
};

const TextTest = () => {
  const [text, setText] = useState("init");

  return (
    <TestContainer title="4. Text Update Test">
      <div>{text}</div>
      <Button
        onClick={() => setText(`Updated Text ${Date.now()}`)}
        style={{ marginTop: "0.5rem" }}
      >
        Update Text
      </Button>
    </TestContainer>
  );
};

const EventTest = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrease = () => {
    if(counter >= 5) return ;
    setCounter((c) => c +1)
  }

  return (
    <TestContainer title="5. Event Handler Test">
      <div>Click Count: {counter}</div>
      <div style={{...styleMixin().flex("","","",5)}}>
        <Button
          onClick={handleIncrease}
          style={{ marginTop: "0.5rem" }}
        >
          Increment Counter
        </Button>
        <Button
          onClick={() => setCounter(0)}
          style={{ marginTop: "0.5rem" }}
        >
          reset
        </Button>
      </div>
    </TestContainer>
  );
};

const FragmentTest = () => {
  const [fragmentToggle, setFragmentToggle] = useState(false);

  return (
    <TestContainer title="6. Fragment Test">
      {fragmentToggle ? (
        <>
          <div style={{ padding: "0.5rem", backgroundColor: "#e2e2e2" }}>
            Fragment Item 1
          </div>
          <div style={{ padding: "0.5rem", backgroundColor: "#cdd836" }}>
            Fragment Item 2
          </div>
        </>
      ) : (
        <div style={{ padding: "0.5rem", backgroundColor: "orange" }}>
          Single Element
        </div>
      )}
      <Button
        onClick={() => setFragmentToggle(!fragmentToggle)}
        style={{ marginTop: "0.5rem" }}
      >
        Toggle
      </Button>
    </TestContainer>
  );
};

const InputTest = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    setInputValue(value);
  };

  return (
    <TestContainer title="7. Input Value Test">
      <input
        type="text"
        value={inputValue}
        onChange={handleInput}
        style={{
          border: "1px solid #ccc",
          padding: "0.5rem",
          borderRadius: "4px",
          width: "100%",
        }}
      />
      <div style={{ marginTop: "0.5rem" }}>Current Value: {inputValue}</div>
    </TestContainer>
  );
};

const EffectTest = () => {
  const [hasCustomAttr, setHasCustomAttr] = useState(false);
  const [effect, setEffect] = useState(false);

  useEffect(() => {
    setEffect(!hasCustomAttr);
  }, [hasCustomAttr]);

  return (
    <TestContainer title="8. Effect Test">
      <div style={{ 
        padding: "1rem", 
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <div
          data-custom={hasCustomAttr ? "custom-value" : undefined}
          style={{ 
            padding: "1rem", 
            border: "1px solid #ccc",
            backgroundColor: effect ? "#f3f4f6" : "#ffffff"
          }}
        >
          {hasCustomAttr ? "Has custom attribute" : "No custom attribute"}
        </div>
        <div>
          Effect State: {effect ? "Active" : "Passive"}
        </div>
        <Button
          onClick={() => setHasCustomAttr(!hasCustomAttr)}
          style={{ marginTop: "0.5rem" }}
        >
          Toggle Attribute
        </Button>
      </div>
    </TestContainer>
  );
};

const ReconciliationTest = () => {
  return (
    <div
      style={{
        ...styleMixin().flex("column", "center", "start", 5),
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Virtual DOM Test
      </h1>
      <StyleTest />
      <ChildrenTest />
      <ConditionalTest />
      <TextTest />
      <EventTest />
      <FragmentTest />
      <InputTest />
      <EffectTest/>
    </div>
  );
};

export default ReconciliationTest;
