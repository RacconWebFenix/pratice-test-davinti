import { Prisma } from '@prisma/client';

export class Contato implements Prisma.ContatoUncheckedCreateInput {
  contatoId?: number;
  id?: number;
  idade: number;
  nome: string;
  telefone?: Prisma.TelefoneUncheckedCreateNestedManyWithoutContatoInput;
}
