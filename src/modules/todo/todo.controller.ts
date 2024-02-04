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

  @Get(':id')
  async findTask(@Param('id') id: string){
    return this.todoService.findTask(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    return this.todoService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: TodoDTO){
    return this.todoService.update(id, data);
  }
  
}



