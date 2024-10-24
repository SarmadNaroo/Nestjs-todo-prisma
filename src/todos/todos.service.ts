import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Task } from '@prisma/client';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) { }

  async create(createTodoDto: CreateTodoDto): Promise<Task> { // Use Task instead of Todo
    return this.prisma.task.create({ // Use task instead of todo
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
      },
    });
  }

  async findAll(): Promise<Task[]> { // Use Task instead of Todo
    return this.prisma.task.findMany(); // Use task instead of todo
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async findOne(id: number): Promise<Task> {
    const todo = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async delete(id: number): Promise<Task> {
    const todo = await this.prisma.task.delete({
      where: { id },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }
}
