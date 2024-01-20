import { Injectable } from '@nestjs/common';
import { CategoryDTO } from './category.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService){}
    
    async create(data: CategoryDTO){
        const categoryExists = await this.prisma.category.findFirst({
            where: {
                name: data.name,
            },
        });

        if (categoryExists){
            throw new Error('Categoria já existe!');
        };

        const category = await this.prisma.category.create({
            data,
        });

        return category;
    }

    async findAll(){
        return this.prisma.category.findMany();
    }

    async findCategory(category: string){
        const categoryExists = this.prisma.category.findFirst({
            where: {
                name: category
            },
        });

        if(!categoryExists){
            throw new Error('Categoria não existente!');
        };

        return this.prisma.todo.findMany({
            where: {
                category: category
            }
        }); 
    }

    async delete(category: string){
        const categoryExists = await this.prisma.category.findFirst({
            where: {
                name: category
            },
        });

        if(!categoryExists){
            throw new Error('Categoria não existente!');
        };

        return await this.prisma.category.delete({
            where:{
                name: category,
            },
        });
    }

    async update(category: string, data: CategoryDTO){
        const categoryExists = await this.prisma.category.findFirst({
            where: {
                name: category
            },
        });

        if(!categoryExists){
            throw new Error('Categoria não existente!');
        };

        return await this.prisma.category.update({
            data,
            where:{
                name: category
            },
        });
    }
}
