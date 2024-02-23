import { Prisma } from '@prisma/client';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateContatoDto {
  @IsString()
  nome: string;
  @IsInt()
  idade: number;
  @IsOptional()
  telefone?: Prisma.TelefoneUncheckedCreateNestedManyWithoutContatoInput;
  create?: Prisma.TelefoneUncheckedCreateNestedManyWithoutContatoInput[];
}
