import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo/todo.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [TodoModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
