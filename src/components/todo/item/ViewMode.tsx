import { Todo } from "@/components/todo/types";

import { styles } from "@/style/styles";

type ViewModeProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onStartEdit: (e: Event) => void;
};

export default function ViewMode({
  todo,
  onToggle,
  onStartEdit,
}: ViewModeProps) {
  return (
    <>
      <div
        onClick={() => onToggle(todo.id)}
        style={{
          ...styles.todoText(todo.completed),
        }}
      >
        <span>{todo.text}</span>
        <span style={styles.dateText}>
          {new Date(todo.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div style={styles.buttonContainer}>
        <button
          onClick={onStartEdit}
          style={{ ...styles.button, ...styles.editButton }}
        >
          수정
        </button>
      </div>
    </>
  );
}
