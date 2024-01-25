import { Injectable } from '@nestjs/common';
import { TodoDTO } from './todo.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService){}
    
    async create(data: TodoDTO){
        const todoExists = await this.prisma.todo.findFirst({
            where: {
                nome: data.nome,
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

    async findTask(id: string){
        const idNum = parseInt(id);
        const todoExists = this.prisma.todo.findUnique({
            where: {
                id: idNum
            },
        });

        if(!todoExists){
            throw new Error('Task não existente!');
        };

        return todoExists;
    }

    async delete(id: string){
        const idNum = parseInt(id);
        const todoExists = await this.prisma.todo.findFirst({
            where: {
                id: idNum
            },
        });

        if(!todoExists){
            throw new Error('Task não existente!');
        };

        return await this.prisma.todo.delete({
            where:{
                id: idNum
            },
        });
    }
    
    async update(id: string, data: TodoDTO){
        const idNum = parseInt(id);
        const todoExists = await this.prisma.todo.findFirst({
            where: {
                id: idNum
            },
        });

        if(!todoExists){
            throw new Error('Task não existente!');
        };

        return await this.prisma.todo.update({
            data,
            where:{
                id: idNum
            },
        });
    }

    async markDone(id: string){
        const idNum = parseInt(id);
        const todoExists = await this.prisma.todo.findFirst({
            where: {
                id: idNum
            },
        });

        if(!todoExists){
            throw new Error('Task não existente!');
        };

        return await this.prisma.todo.update({
            where:{
                id: idNum
            },
            data:{
                isActive: !todoExists.isActive // muda o estado de done
            },
        });
    }
}
