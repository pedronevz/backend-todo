import {IsNotEmpty, IsString} from 'class-validator';

export class CategoryDTO{
    @IsString({message: 'Insira um nome válido!'})
    @IsNotEmpty({message: 'Insira um nome!'})
    nome: string;
};