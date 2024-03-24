import { Todo } from './todo.entity';
import { TodoState } from './todoState.enum';

describe('Todo entity', () => {
  it('should be defined', () => {
    const todo = new Todo();
    todo.task = 'Buy milk';

    expect(todo).toBeDefined();
    expect(todo.id).toBeUndefined();
  });

  it('should create a new todo with default state', () => {
    const task = 'Fix the sink';
    const todo = new Todo();
    todo.task = task;

    expect(todo).toBeDefined();
    expect(todo).toBeInstanceOf(Todo);
    expect(todo.task).toBe(task);
    expect(todo.state).toBe(TodoState.Await);
  });

  it('should allow setting state after creation', () => {
    const todo = new Todo();
    const task = 'Clean the house';
    todo.task = task;

    todo.state = TodoState.InProgress;

    expect(todo.task).toBe(task);
    expect(todo.state).toBe(TodoState.InProgress);

    todo.state = TodoState.Done;

    expect(todo.state).toBe(TodoState.Done);
  });
});
