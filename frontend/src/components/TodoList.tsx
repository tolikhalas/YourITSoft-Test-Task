import React from "react";

import { Todo } from "../todo/Todo.interface";
import { TodoDto } from "../todo/TodoDto.interface";
import TodoItem from "./TodoItem";

const TodoList: React.FC<{
  todos: Todo[];
  updateTodoItem: (id: number, updatedTodo: TodoDto) => void;
  deleteTodoItem: (id: number) => void;
}> = ({ todos, updateTodoItem: updateTodoItem, deleteTodoItem }) => {
  return (
    <ul className="list-none">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodoItem={updateTodoItem}
          deleteTodoItem={deleteTodoItem}
        />
      ))}
    </ul>
  );
};

export default TodoList;
