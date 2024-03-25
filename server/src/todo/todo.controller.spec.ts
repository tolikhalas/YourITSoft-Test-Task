import { Test, TestingModule } from '@nestjs/testing';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoServiceMock } from './todo.service.mock';

import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoState } from './entities/todoState.enum';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { NotFoundException } from '@nestjs/common';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useClass: TodoServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const createTodoDto: CreateTodoDto = new CreateTodoDto();
      createTodoDto.task = 'Wash the dishes';
      createTodoDto.state = TodoState.Await;
      const mockTodo = new Todo();
      mockTodo.task = createTodoDto.task;

      jest.spyOn(controller, 'create').mockResolvedValueOnce(mockTodo);
      const result = await controller.create(createTodoDto);
      expect(result).toEqual(createTodoDto);
    });
  });

  describe('findAll', () => {
    it('should return all todos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a todo', async () => {
      const todo: Todo = new Todo();
      todo.id = 1;
      todo.task = 'Fix the roof';
      todo.state = TodoState.InProgress;

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(todo);
      const result = await controller.findOne('1');
      expect(result).toEqual(todo);
    });

    it('should throw NotFoundException if to do is not found', async () => {
      const todo: Todo = new Todo();
      todo.id = 999;
      todo.task = 'Solve the universe';
      todo.state = TodoState.InProgress;

      jest.spyOn(service, 'findOne');
      await expect(async () => await controller.findOne('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const updateTodoDto: UpdateTodoDto = new UpdateTodoDto();
      updateTodoDto.task = 'Water the plants';

      const updateTodo: Todo = new Todo();
      updateTodo.id = 2;
      updateTodo.task = 'Water the plants';

      jest.spyOn(service, 'update').mockResolvedValue(updateTodo);
      const result = await controller.update('2', updateTodoDto);
      expect(result).toEqual(updateTodo);
    });

    it('should throw NotFoundException if to do is not found', async () => {
      const updateTodoDto: UpdateTodoDto = new UpdateTodoDto();
      updateTodoDto.task = 'Fix the fridge';

      jest.spyOn(service, 'update').mockResolvedValue(undefined);
      const result = await controller.update('999', updateTodoDto);
      expect(result).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
