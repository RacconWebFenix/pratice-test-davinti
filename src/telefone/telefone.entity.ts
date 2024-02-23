import { Prisma } from '@prisma/client';

export class Telefone implements Prisma.ContatoUncheckedCreateInput {
  id?: number;
  nome: string;
  idade: number;
  telefone?: Prisma.TelefoneUncheckedCreateNestedManyWithoutContatoInput;
}
