import TodoItem from "@/components/todo/item/TodoItem";

import { Todo } from "@/components/todo/types";

type TodoListProps = {
  todos: Todo[];
  onUpdate: (id: string, text: string) => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
};

export default function TodoList({
  todos,
  onRemove,
  onUpdate,
  onToggle,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <section>
        <p>할 일이 없습니다.</p>
      </section>
    );
  }

  return (
    <section style={{ width: "80%", maxWidth: "50rem" }}>
      <ul>
        {todos.length > 0 && todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={onRemove}
            onUpdate={onUpdate}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </section>
  );
}
