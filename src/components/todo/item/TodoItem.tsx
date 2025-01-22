import { useState } from "@/libs/hooks";

import { styles } from "@/style";

import { Todo } from "@/components/todo/types";

import ViewMode from "./ViewMode";
import EditMode from "./EditMode";

type TodoItemProps = {
  todo: Todo;
  key: string;
  onUpdate: (id: string, text: string) => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onRemove,
}: TodoItemProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [text, setText] = useState<string>(todo.text);

  // 적용
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!text.trim()) return;
    onUpdate(todo.id, text);
    setIsEdit(false);
  };

  // 텍스트 변경
  const handleInputChange = (e: Event) => {
    setText((e.target as HTMLInputElement).value);
  };

  // 편집모드 취소
  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  // 편집모드 활성
  const handleStartEdit = (e: Event) => {
    e.stopPropagation();
    setText(todo.text); 
    setIsEdit(true);
  };

  return (
    <li style={styles.listItem}>
      {isEdit ? (
        <EditMode
          text={text}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          onCancel={handleCancelEdit}
        />
      ) : (
        <ViewMode
          todo={todo}
          onToggle={onToggle}
          onStartEdit={handleStartEdit}
          onRemove={onRemove}
        />
      )}
    </li>
  );
}
