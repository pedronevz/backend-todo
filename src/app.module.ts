import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [TodoModule, CategoryModule],
})
export class AppModule {}
