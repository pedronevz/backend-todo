import { Injectable } from '@nestjs/common';
import { TodoDTO } from './todo.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService){}
    
    async create(data: TodoDTO){
        const todoExists = await this.prisma.todo.findFirst({
            where: {
                task: data.task,
            },
        });

        if (todoExists){
            throw new Error('Task já existe!');
        };

        const todo = await this.prisma.todo.create({
            data,
        });

        return todo;
    }

    async findAll(){
        return this.prisma.todo.findMany();
    }

    async delete(task: string){
        const todoExists = await this.prisma.todo.findFirst({
            where: {
                task
            },
        });

        if(!todoExists){
            throw new Error('Task não existente!');
        };

        return await this.prisma.todo.delete({
            where:{
                task: task,
            },
        });
    }

    async update(task: string, data: TodoDTO){
        const todoExists = await this.prisma.todo.findFirst({
            where: {
                task
            },
        });

        if(!todoExists){
            throw new Error('Task não existente!');
        };

        return await this.prisma.todo.update({
            data,
            where:{
                task
            },
        });
    }
}
