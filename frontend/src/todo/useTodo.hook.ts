import { useState, useEffect } from "react";
import { Todo } from "./Todo.interface";
import http from "../api";

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchInitialTodos = async () => {
      try {
        const response = await http.get("/todo");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchInitialTodos();

    return () => {};
  }, []);

  const addTodo = async (newTodo: Todo) => {
    try {
      const response = await http.post("/todo", newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodoItem = async (updatedTodo: Todo) => {
    try {
      const response = await http.put(`/todo/${updatedTodo.id}`, updatedTodo); // Use http for updating
      setTodos(
        todos.map((todo) =>
          todo.id === updatedTodo.id ? response.data : todo,
        ),
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodoItem = async (id: number) => {
    try {
      await http.delete(`/todo/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return { todos, addTodo, updateTodoItem, deleteTodoItem };
}
