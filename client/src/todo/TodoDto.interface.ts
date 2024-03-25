import { TodoState } from "./TodoState.enum";

export interface TodoDto {
  task: string;
  state: TodoState;
}
