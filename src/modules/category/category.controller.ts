import { Controller, Body, Post, Get, Delete, Put, Param, UsePipes, ValidationPipe  } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CategoryDTO){
    return this.categoryService.create(data);
  };

  @Get()
  async findAll(){
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findCategory(@Param('id') id: string){
    return this.categoryService.findCategory(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    return this.categoryService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() category: CategoryDTO){
    return this.categoryService.update(id, category);
  }
  
}
