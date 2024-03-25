import { ConsoleLogger } from '@nestjs/common';
import { Todo } from 'src/todo/entities/todo.entity';

export class TodoLogger extends ConsoleLogger {
  log(message: any, ...optionalParams: any[]) {
    const todos = optionalParams.filter((param) => param instanceof Todo);
    const todoArrays = optionalParams.filter(
      (param) =>
        Array.isArray(param) && param.every((item) => item instanceof Todo),
    );
    const otherParams = optionalParams.filter(
      (param) => !(param instanceof Todo) && !Array.isArray(param),
    );

    const serializedTodos = todos.map((todo) => JSON.stringify(todo));
    const serializedTodoArrays = todoArrays.map(
      (todoArray) =>
        `[${todoArray.map((todo) => JSON.stringify(todo)).join(', ')}]`,
    );

    const logMessage = [message];
    if (serializedTodos.length > 0) {
      logMessage.push(...serializedTodos);
    }
    if (serializedTodoArrays.length > 0) {
      logMessage.push(...serializedTodoArrays);
    }

    super.log(logMessage.join(' '), ...otherParams);
  }
}
