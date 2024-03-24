import { ChangeEvent, FormEvent, useState } from "react";

import TodoList from "./components/TodoList";

import "./App.css";
import { TodoState } from "./todo/TodoState.enum";
import { useTodo } from "./todo/useTodo.hook";

function App() {
  const { todos, addTodo, deleteTodoItem } = useTodo();
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
        <div className="flex space-x-2">
          <input
            className="rounded-lg px-4 py-2"
            type="text"
            value={inputTask}
            onChange={handleTaskChange}
          />
          <select
            className="cursor-pointer rounded-lg px-4 py-2"
            name="state"
            id="state"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="await">await</option>
            <option value="in progress">in progress</option>
            <option value="done">done</option>
          </select>
          <button type="submit" onClick={handleSubmit}>
            Add Todo
          </button>
        </div>
        <TodoList todos={todos} deleteTodoItem={deleteTodoItem} />
      </div>
    </div>
  );
}

export default App;
