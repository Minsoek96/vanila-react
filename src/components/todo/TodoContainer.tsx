import { useState } from "@/libs/hooks";

import { styleMixin } from "@/style";

import { getUniqueId } from "@/utils";

import { Todo } from "@/components/todo/types";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const formatTodo = (text: string): Todo => {
  const id = getUniqueId(text);
  return {
    id,
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
};

export default function TodoContainer() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const mainTitle = "Todo-List";

  //추가
  const handleAddTodo = (todo: string) => {
    if (!todo.trim()) return;
    const newTodo = formatTodo(todo);
    setTodos((prev) => [...prev, newTodo]);
  };

  //업데이트
  const handleUpdate = (id: string, changeTodo: string) => {
    const updateItem = todos.map((todo) =>
      todo.id === id ? { ...todo, text: changeTodo } : todo
    );
    setTodos(updateItem);
  };

  //삭제
  const handleDelete = (id: string) => {
    const filterItem = todos.filter((todo) => todo.id !== id);
    setTodos(filterItem);
  };

  //토글링
  const handleToggle = (id: string) => {
    const toggleItem = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(toggleItem);
  };

  return (
    <div style={{ ...styleMixin().flex("column", "center") }}>
      <h1>{mainTitle}</h1>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onUpdate={handleUpdate}
        onRemove={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}
