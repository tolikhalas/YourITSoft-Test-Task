import { TodoState } from "./TodoState.enum";

export interface Todo {
  id: number;
  task: string;
  state: TodoState;
}
