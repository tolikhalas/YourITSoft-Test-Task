import { useState, useEffect } from "react";
import { Todo } from "./Todo.interface";
import http from "../api";
import { TodoDto } from "./TodoDto.interface";

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

  const addTodo = async (newTodo: TodoDto) => {
    try {
      const response = await http.post("/todo", newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodoItem = async (id: number, updatedTodo: TodoDto) => {
    try {
      const response = await http.put(`/todo/${id}`, updatedTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo,
      );
      setTodos(updatedTodos);
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
