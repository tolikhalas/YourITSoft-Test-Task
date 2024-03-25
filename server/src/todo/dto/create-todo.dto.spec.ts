import { validate } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';
import { TodoState } from '../entities/todoState.enum';

describe('CreateTodoDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new CreateTodoDto();
    dto.task = 'Valid Task';
    dto.state = TodoState.Await;
    const errors = await validate(dto);
    expect(errors.length).toEqual(0);
  });

  it('should fail validation if task is empty', async () => {
    const dto = new CreateTodoDto();
    dto.task = '';
    dto.state = TodoState.InProgress;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail validation if task is a empty string', async () => {
    const dto = new CreateTodoDto();
    dto.task = '';
    dto.state = TodoState.Await;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if state is not a valid TodoState', async () => {
    const dto = new CreateTodoDto();
    dto.task = 'Valid Task';
    dto.state = 'InvalidState' as TodoState;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEnum');
  });
});
