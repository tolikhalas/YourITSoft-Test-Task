import { BadRequestException } from '@nestjs/common';
import { TodoValidationPipe } from './todo-validation.pipe';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';
import { TodoState } from 'src/todo/entities/todoState.enum';
import { Test, TestingModule } from '@nestjs/testing';

describe('TodoValidationPipe', () => {
  let pipe: TodoValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoValidationPipe],
    }).compile();
    pipe = module.get<TodoValidationPipe>(TodoValidationPipe);
  });

  it('should throw BadRequestException when validation fails', () => {
    const invalidDto: CreateTodoDto = {
      task: '',
      state: 'InvalidState' as TodoState,
    };
    expect(() => pipe.transform(invalidDto, { type: 'body' })).toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException when validation fails for UpdateTodoDto', () => {
    const invalidDto: UpdateTodoDto = {
      task: '',
      state: 'InvalidState' as TodoState,
    };
    expect(() => pipe.transform(invalidDto, { type: 'body' })).toThrow(
      BadRequestException,
    );
  });

  it('should return value when validation passes for UpdateTodoDto', () => {
    const validDto: UpdateTodoDto = {
      state: 'in progress' as TodoState.InProgress,
    };
    const result = pipe.transform(validDto, { type: 'body' });
    expect(result).toEqual(validDto);
  });

  it('should return value when validation passes', () => {
    const validDto: CreateTodoDto = {
      task: 'Valid Task',
      state: 'in progress' as TodoState.InProgress,
    };
    const result = pipe.transform(validDto, { type: 'body' });
    expect(result).toEqual(validDto);
  });
});
