import { Injectable } from '@nestjs/common';
import { CategoryDTO } from './category.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService){}
    
    async create(data: CategoryDTO){
        const categoryExists = await this.prisma.category.findFirst({
            where: {
                nome: data.nome,
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

    async findCategory(id: string){
        const idNum = parseInt(id);

        if (isNaN(idNum) || idNum <= 0) { // checar validade do ID => NaN = Not a Number
            const idInvalido = new Error('ID inválido!');
            idInvalido['statusCode'] = 400;
            throw idInvalido;
        }

        const categoryExists = await this.prisma.category.findFirst({
            where: {
                id: idNum
            },
        });

        if(!categoryExists){
            const notFoundError = new Error('Cartegoria não existente!');
            notFoundError['statusCode'] = 404;
            throw notFoundError;
        };

        return categoryExists
    }

    async delete(id: string){
        const idNum = parseInt(id);

        if (isNaN(idNum) || idNum <= 0) { // checar validade do ID => NaN = Not a Number
            const idInvalido = new Error('ID inválido!');
            idInvalido['statusCode'] = 400;
            throw idInvalido;
        }

        const categoryExists = await this.prisma.category.findFirst({
            where: {
                id: idNum
            },
        });

        if(!categoryExists){
            const notFoundError = new Error('Categoria não existente!');
            notFoundError['statusCode'] = 404;
            throw notFoundError;
        };

        return await this.prisma.category.delete({
            where:{
                id: idNum
            },
        });
    }

    async update(id: string, category: CategoryDTO){
        const idNum = parseInt(id);

        if (isNaN(idNum) || idNum <= 0) { // checar validade do ID => NaN = Not a Number
            const idInvalido = new Error('ID inválido!');
            idInvalido['statusCode'] = 400;
            throw idInvalido;
        }

        const categoryExists = await this.prisma.category.findFirst({
            where: {
                id: idNum
            },
        });

        if(!categoryExists){
            const notFoundError = new Error('Categoria não existente!');
            notFoundError['statusCode'] = 404;
            throw notFoundError;
        };

        return await this.prisma.category.update({
            where:{
                id: idNum
            },
            data:{
                nome: category.nome
            },
        });
    }
}
