import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validateSync } from 'class-validator';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';

@Injectable()
export class TodoValidationPipe implements PipeTransform {
  transform(value: CreateTodoDto | UpdateTodoDto, metadata: ArgumentMetadata) {
    let todoDto;
    if (value instanceof CreateTodoDto) {
      todoDto = new CreateTodoDto();
    } else {
      todoDto = new UpdateTodoDto();
    }
    Object.assign(todoDto, value);

    const errors = validateSync(todoDto);
    if (errors.length > 0) {
      throw new BadRequestException(
        `Validation failed: ${JSON.stringify(errors)}\n Metadata: ${JSON.stringify(metadata)}`,
      );
    }

    return value;
  }
}
