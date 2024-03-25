import { Todo } from 'src/todo/entities/todo.entity';
import { TodoLogger } from './logger/logger.provider';
import { MockTodoLogger } from './logger/logger.provider.mock';
import { TodoState } from 'src/todo/entities/todoState.enum';
import { Test } from '@nestjs/testing';

describe('TodoLogger', () => {
  let logger: TodoLogger;
  let mockLogger: MockTodoLogger;

  beforeEach(async () => {
    mockLogger = new MockTodoLogger();

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: TodoLogger,
          useValue: mockLogger,
        },
      ],
    }).compile();
    logger = module.get<TodoLogger>(TodoLogger);
  });

  afterEach(() => {
    mockLogger.clearLogs();
  });

  it('should log message with a single Todo', () => {
    const todo = new Todo({ task: 'Buy milk', state: TodoState.Await });
    logger.log('Create Todo:', todo);
    const logs = (logger as MockTodoLogger).getLogs();
    expect(logs).toContain('Create Todo: {"task":"Buy milk","state":"await"}');
  });

  it('should log message with an array of Todos', () => {
    const todo1 = new Todo({ task: 'Buy milk', state: TodoState.Await });
    const todo2 = new Todo({
      task: 'Clean the house',
      state: TodoState.InProgress,
    });
    const todos = [todo1, todo2];
    logger.log('Find All Todos:', todos);
    const logs = mockLogger.getLogs();
    expect(logs).toContain(
      'Find All Todos: [{"task":"Buy milk","state":"await"}, {"task":"Clean the house","state":"in progress"}]',
    );
  });

  it('should log message without Todos', () => {
    const message = 'This is a test message';
    const param1 = 'Param 1';
    const param2 = 42;
    logger.log(message, param1, param2);
    const logs = mockLogger.getLogs();
    expect(logs).toContain(`${message} ${param1} ${param2}`);
  });

  it('should log message with both Todos and other params', () => {
    const todo = new Todo({ task: 'Go for a run', state: TodoState.Done });
    const param1 = 'Additional param';
    const param2 = true;
    logger.log('Update Todo:', todo, param1, param2);
    const logs = mockLogger.getLogs();
    expect(logs).toContain(
      'Update Todo: {"task":"Go for a run","state":"done"} Additional param true',
    );
  });

  it('should log message with an array of Todos and other params', () => {
    const todo1 = new Todo({ task: 'Buy milk', state: TodoState.Await });
    const todo2 = new Todo({
      task: 'Clean the house',
      state: TodoState.InProgress,
    });
    const todos = [todo1, todo2];
    const param1 = 'Additional param';
    const param2 = 42;
    logger.log('Find All Todos:', todos, param1, param2);
    const logs = mockLogger.getLogs();
    expect(logs).toContain(
      'Find All Todos: [{"task":"Buy milk","state":"await"}, {"task":"Clean the house","state":"in progress"}] Additional param 42',
    );
  });
});
