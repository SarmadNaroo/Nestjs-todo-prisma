import { Controller, Post, Body, Get, Put, Param, Delete} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Task } from '@prisma/client';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto); // Convert id to number
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.todosService.findOne(Number(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todosService.delete(Number(id)); // Convert id to number
  }

}
