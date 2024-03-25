import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    const todoPromise = this.todoRepository.save(todo);
    this.logger.log('Create Todo: ', await todoPromise);
    return todoPromise;
  }

  async findAll(): Promise<Todo[]> {
    const todos = this.todoRepository.find();
    this.logger.log('Find All Todos: ', await todos);
    return todos;
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    this.logger.log('Find One Todo: ', await todo);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | undefined> {
    const todo = await this.findOne(id);
    Object.assign(todo, updateTodoDto);
    this.logger.log('Update Todo: ', await todo);
    return this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    const todo = await this.findOne(id);
    if (todo) {
      this.logger.log('Delete Todo: ', await todo);
      await this.todoRepository.remove(todo);
    }
  }
}
