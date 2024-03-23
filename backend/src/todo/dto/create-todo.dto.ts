import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TodoState } from '../entities/todoState.enum';

export class CreateTodoDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  task: string;

  @IsOptional()
  @IsEnum(TodoState)
  state: TodoState;
}
