import React from "react";
import { Todo } from "../todo/Todo.interface";
import TodoItem from "./TodoItem";

const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <ul className="list-none">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
