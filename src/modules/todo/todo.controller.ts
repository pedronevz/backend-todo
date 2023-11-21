import { Body, Controller, Post, Get, Delete, Param, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDTO } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() data: TodoDTO){
    return this.todoService.create(data);
  }

  @Get()
  async findAll(){
    return this.todoService.findAll();
  }

  @Delete(':task')
  async delete(@Param('task') task: string){
    return this.todoService.delete(task);
  }

  @Put(':task')
  async update(@Param('task') task: string, @Body() data: TodoDTO){
    return this.todoService.update(task, data);
  }
}
