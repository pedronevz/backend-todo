import { Controller, Body, Post, Get, Delete, Put, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() data: CategoryDTO){
    return this.categoryService.create(data);
  };

  @Get()
  async findAll(){
    return this.categoryService.findAll();
  }

  @Get(':category')
  async findCategory(@Param('category') category: string){
    return this.categoryService.findCategory(category);
  }

  @Delete(':category')
  async delete(@Param('category') category: string){
    return this.categoryService.delete(category);
  }

  @Put(':category')
  async update(@Param('category') category: string, @Body() data: CategoryDTO){
    return this.categoryService.update(category, data);
  }
  
}
