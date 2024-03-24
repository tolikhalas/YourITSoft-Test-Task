import { useState } from "react";

import { Todo } from "./todo/Todo.interface";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
