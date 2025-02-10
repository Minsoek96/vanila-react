import { Todo } from "@/components/todo/types";

import { styles } from "@/style/styles";

type ViewModeProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onStartEdit: (e: Event) => void;
  onRemove: (id: string) => void;
};

export default function ViewMode({
  todo,
  onToggle,
  onStartEdit,
  onRemove,
}: ViewModeProps) {
  return (
    <div>
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
        <button
          onClick={() => onRemove(todo.id)}
          style={{ ...styles.button, ...styles.cancelButton }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
