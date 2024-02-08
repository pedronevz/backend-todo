import { Body, Controller, Post, Get, Delete, Param, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDTO } from './todo.dto';
import { TodoUpdateDTO } from './todoUpdate.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UsePipes(new ValidationPipe())
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

  @Get('categoria/:id')
  async findTaskByCategory(@Param('id') id: string){
    return this.todoService.findTaskByCategory(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    return this.todoService.delete(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() data: TodoUpdateDTO){
    return this.todoService.update(id, data);
  }
  
}



