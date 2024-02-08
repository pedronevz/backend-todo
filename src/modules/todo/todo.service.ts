import { Injectable } from '@nestjs/common';
import { TodoDTO } from './todo.dto';
import { TodoUpdateDTO } from './todoUpdate.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService){}
    
    private excludeCategoriaId<T>(obj: T): Omit<T, 'categoriaId'> { // omitir "categoriaId" do teste
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) => key !== 'categoriaId')
        ) as Omit<T, 'categoriaId'>;
      }

    async create(data: TodoDTO){
        const todoExists = await this.prisma.todo.findFirst({
            where: {
                nome: data.nome,
            },
        });

        if (todoExists){
            throw new Error('Task já existe!');
        };

        if (data.categoriaId !== undefined){
            const categoria = await this.prisma.category.findUnique({
                where: {
                    id: data.categoriaId,
                },
            });

            if (!categoria) {
                const notFoundError = new Error('Essa categoria não existe!');
                notFoundError['statusCode'] = 404;
                throw notFoundError;
            }
        }

        const todo = await this.prisma.todo.create({
            data,
        });

        return todo;
    }

    async findAll(){
        const todos = await this.prisma.todo.findMany({include: {
            categoria: {
              select: {
                id: true,
                nome: true,
              },
            },
          },});
          
        const todosSemCategoriaId = todos.map((todo) => {
            const { categoriaId, ...todosSemCategoriaId } = todo;
            return todosSemCategoriaId;
        });

        return todosSemCategoriaId
        
    }

    async findTask(id: string){
        if (id === "completas"){
            const todos = await this.prisma.todo.findMany({include: {
                categoria: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
                where: {
                    isActive: false
                },
            });

            if(todos.length === 0){
                const notFoundError = new Error('Nenhuma tarefa está completa!');
                notFoundError['statusCode'] = 404;
                throw notFoundError;
            };

            const todosSemCategoriaId = todos.map((todo) => {
                const { categoriaId, ...todosSemCategoriaId } = todo;
                return todosSemCategoriaId;
            });

            return todosSemCategoriaId
        }

        const idNum = parseInt(id);

        if (isNaN(idNum) || idNum <= 0) { // checar validade do ID => NaN = Not a Number
            const idInvalido = new Error('ID inválido!');
            idInvalido['statusCode'] = 400;
            throw idInvalido;
        }

        const todoExists = await this.prisma.todo.findFirst({
            include: {
                categoria: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
            where: {
                id: idNum
            },
        });

        if(!todoExists){
            const notFoundError = new Error('Task não existente!');
            notFoundError['statusCode'] = 404;
            throw notFoundError;
        };

        return this.excludeCategoriaId(todoExists)
    }
    
    async findTaskByCategory(id: string){
        const idNum = parseInt(id);

        if (isNaN(idNum) || idNum <= 0) { // checar validade do ID => NaN = Not a Number
            const idInvalido = new Error('ID inválido!');
            idInvalido['statusCode'] = 400;
            throw idInvalido;
        }
        
        const todos = await this.prisma.todo.findMany({include: {
            categoria: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
          where: {
            categoriaId: idNum
            },
        });

        if(todos.length === 0){
            const notFoundError = new Error('Essa categoria não possui tarefas!');
            notFoundError['statusCode'] = 404;
            throw notFoundError;
        };


        const todosSemCategoriaId = todos.map((todo) => {
            const { categoriaId, ...todosSemCategoriaId } = todo;
            return todosSemCategoriaId;
        });

        return todosSemCategoriaId
    }

    async delete(id: string){
        if (id === "limpar-completas"){ 
            const todoExists = await this.prisma.todo.findMany({
                where: {
                    isActive: false
                },
            });
    
            if(!todoExists){
                const notFoundError = new Error('Nenhuma tarefa está completa!');
                notFoundError['statusCode'] = 404;
                throw notFoundError;
            };
    
            return await this.prisma.todo.deleteMany({
                where:{
                    isActive: false
                },
            });
        }

        else{
            const idNum = parseInt(id);

            if (isNaN(idNum) || idNum <= 0) { // checar validade do ID => NaN = Not a Number
                const idInvalido = new Error('ID inválido!');
                idInvalido['statusCode'] = 400;
                throw idInvalido;
            }

            const todoExists = await this.prisma.todo.findFirst({
                where: {
                    id: idNum
                },
            });

            if(!todoExists){
                const notFoundError = new Error('Task não existente!');
                notFoundError['statusCode'] = 404;
                throw notFoundError;
            };

            const todoDel = await this.prisma.todo.delete({
                include: {
                    categoria: {
                    select: {
                        id: true,
                        nome: true,
                    },
                    },
                },
                where:{
                    id: idNum
                },
            });

            return this.excludeCategoriaId(todoDel)
        }
    }

    async update(id: string, data: TodoUpdateDTO){
        const idNum = parseInt(id);

        if (isNaN(idNum) || idNum <= 0) { // checar validade do ID => NaN = Not a Number
            const idInvalido = new Error('ID inválido!');
            idInvalido['statusCode'] = 400;
            throw idInvalido;
        }

        const todoExists = await this.prisma.todo.findFirst({
            where: {
                id: idNum
            },
        });

        if(!todoExists){
            const notFoundError = new Error('Task não existente!');
            notFoundError['statusCode'] = 404;
            throw notFoundError;
        };

        const todoUpdate = await this.prisma.todo.update({
            include: {
                categoria: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
            data,
            where:{
                id: idNum
            },
        });

        return this.excludeCategoriaId(todoUpdate)
    }

}
