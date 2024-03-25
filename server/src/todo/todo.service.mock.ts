// Import necessary modules and classes
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { NotFoundException } from '@nestjs/common';

// Mock TodoService class
export class TodoServiceMock {
  // Mocked data
  private todos: Todo[] = [];

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo: Todo = {
      id: this.todos.length + 1,
      ...createTodoDto,
    };
    this.todos.push(todo);
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    return this.todos;
  }

  async findOne(id: number): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | undefined> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return undefined;

    this.todos[index] = { ...this.todos[index], ...updateTodoDto };
    return this.todos[index];
  }

  async remove(id: number): Promise<void> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
}
