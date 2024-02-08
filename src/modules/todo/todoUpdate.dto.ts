import {IsNotEmpty, IsInt, IsOptional, IsString, IsBoolean} from 'class-validator';

export class TodoUpdateDTO {
  @IsString({message: 'Insira um nome válido!'})
  @IsNotEmpty({message: 'Insira um nome!'})
  @IsOptional()
  nome?: string;
  
  @IsBoolean({message: 'Insira um estado válido!'})
  @IsOptional()
  isActive: boolean;

};
