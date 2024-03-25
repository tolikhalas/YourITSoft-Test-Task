import { useState, ChangeEvent, FormEvent } from "react";

import { TodoState } from "../../todo/TodoState.enum";
import TodoList from "./TodoList";
import { useTodo } from "../../todo/useTodo.hook";
import CreateTodoBar from "./CreateTodoBar";

const TodoApp = () => {
  const { todos, addTodo, updateTodoItem, deleteTodoItem } = useTodo();
  const [inputTask, setTaskInputValue] = useState("");
  const [selectedState, setSelectedState] = useState<TodoState>(
    "await" as TodoState,
  );

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInputValue(e.target.value);
  };

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value as TodoState);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo({ task: inputTask, state: selectedState });
    setTaskInputValue("");
  };

  return (
    <div className="flex min-h-screen w-screen items-start justify-center p-40">
      <div className="grid">
        <h1 className="mb-4 text-center text-3xl font-bold">Todo List</h1>
        <CreateTodoBar
          inputTask={inputTask}
          handleTaskChange={handleTaskChange}
          selectedState={selectedState}
          handleStateChange={handleStateChange}
          handleSubmit={handleSubmit}
        />
        <TodoList
          todos={todos}
          updateTodoItem={updateTodoItem}
          deleteTodoItem={deleteTodoItem}
        />
      </div>
    </div>
  );
};

export default TodoApp;
