import {IsNotEmpty, IsInt, IsOptional, IsString} from 'class-validator';
export class TodoDTO {
  @IsString({message: 'Insira um nome válido!'})
  @IsNotEmpty({message: 'Insira um nome!'})
  nome: string;

  isActive: boolean;

  @IsInt({message: 'Insira uma categoria válida!'})
  @IsOptional()
  categoriaId?: number;
};


