import { TodoState } from '../entities/todoState.enum';

export class CreateTodoDto {
  task: string;
  state: TodoState;
}
