import { ChangeEvent, FormEvent, useState } from "react";

import { Todo } from "./todo/Todo.interface";
import TodoList from "./components/TodoList";

import "./App.css";
import { TodoState } from "./todo/TodoState.enum";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
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
    setTodos([...todos, { task: inputTask, state: selectedState }]);
    setTaskInputValue("");
  };

  return (
    <div className="min-h-screen w-screen flex items-start justify-center p-40">
      <div className="grid">
        <h1 className="text-3xl font-bold mb-4 text-center">Todo List</h1>
        <div className="flex space-x-2">
          <input
            className="px-4 py-2 rounded-lg"
            type="text"
            value={inputTask}
            onChange={handleTaskChange}
          />
          <select
            className="px-4 py-2 rounded-lg cursor-pointer"
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
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
