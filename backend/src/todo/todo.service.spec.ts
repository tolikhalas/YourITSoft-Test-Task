import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { NotFoundException } from '@nestjs/common';
import { TodoState } from './entities/todoState.enum';

describe('TodoService', () => {
  let service: TodoService;
  let repository: Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        task: 'Test Todo',
        state: TodoState.Await,
      };
      const todo = new Todo();
      todo.task = createTodoDto.task;

      jest.spyOn(repository, 'create').mockReturnValue(todo);
      jest.spyOn(repository, 'save').mockResolvedValue(todo);

      const result = await service.create(createTodoDto);

      expect(repository.create).toHaveBeenCalledWith(createTodoDto);
      expect(repository.save).toHaveBeenCalledWith(todo);
      expect(result).toEqual(todo);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const todos = [new Todo(), new Todo()];
      jest.spyOn(repository, 'find').mockResolvedValue(todos);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(todos);
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', async () => {
      const todo = new Todo();
      todo.id = 1;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(todo);

      const result = await service.findOne(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(todo);
    });

    it('should throw NotFoundException if todo is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const todo = new Todo();
      todo.id = 1;
      todo.task = 'Old task';

      const updateTodoDto: UpdateTodoDto = { task: 'New task' };

      jest.spyOn(service, 'findOne').mockResolvedValue(todo);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue({ ...todo, ...updateTodoDto });

      const result = await service.update(1, updateTodoDto);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(repository.save).toHaveBeenCalledWith({
        ...todo,
        ...updateTodoDto,
      });
      expect(result).toEqual({ ...todo, ...updateTodoDto });
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      const todo = new Todo();
      todo.id = 1;

      jest.spyOn(service, 'findOne').mockResolvedValue(todo);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(repository.remove).toHaveBeenCalledWith(todo);
    });
  });
});
