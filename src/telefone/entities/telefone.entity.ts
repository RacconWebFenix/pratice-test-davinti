import { Prisma } from '@prisma/client';

export class Telefone implements Prisma.TelefoneUncheckedCreateInput {
  contatoId?: number;
  id?: number;
  numero: string;
}
