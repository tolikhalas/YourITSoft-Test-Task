import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { BadIdExceptionFilter } from 'src/badid/bad-id.filter';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @UseFilters(BadIdExceptionFilter)
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException();
    }
    return this.todoService.findOne(+id);
  }

  @Put(':id')
  @Patch(':id')
  @UseFilters(BadIdExceptionFilter)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    if (isNaN(+id)) {
      throw new BadRequestException();
    }
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @UseFilters(BadIdExceptionFilter)
  remove(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException();
    }
    return this.todoService.remove(+id);
  }
}
