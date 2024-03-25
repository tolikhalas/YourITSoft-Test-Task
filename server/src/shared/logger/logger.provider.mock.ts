import { Todo } from 'src/todo/entities/todo.entity';
import { TodoLogger } from './logger.provider';

export class MockTodoLogger extends TodoLogger {
  private logs: string[] = [];

  log(message: any, ...optionalParams: any[]) {
    const logMessage = [message.toString()];
    optionalParams.forEach((param) => {
      if (param instanceof Todo) {
        logMessage.push(JSON.stringify(param));
      } else if (Array.isArray(param)) {
        const serializedArray = param
          .filter((item) => item instanceof Todo)
          .map((todo) => JSON.stringify(todo));
        logMessage.push(`[${serializedArray.join(', ')}]`);
      } else {
        logMessage.push(param.toString());
      }
    });
    this.logs.push(logMessage.join(' '));
  }

  getLogs(): string[] {
    return this.logs;
  }

  clearLogs(): void {
    this.logs = [];
  }
}
