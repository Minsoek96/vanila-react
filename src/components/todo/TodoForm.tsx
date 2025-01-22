import { useState } from "@/libs/hooks";
import { styleMixin, styles } from "@/style";

type TodoFormProps = {
  onAdd: (value: string) => void;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState<string>("");

  const handleChangeText = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    setText(value);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ ...styleMixin().flex(), width: "100%", maxWidth: "50rem" }}
    >
      <input
        value={text}
        placeHolder={"빈 칸을 채우세요."}
        onChange={handleChangeText}
        style={{ ...styles.input, flex: 9 }}
      />
      <button
        type="submit"
        style={{
          ...styles.button,
          ...styles.saveButton,
          flex: 1,
          maxWidth: "5rem",
        }}
      >
        추가
      </button>
    </form>
  );
}
