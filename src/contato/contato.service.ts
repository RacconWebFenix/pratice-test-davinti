import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateContatoDto } from './dto/update-contato.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Contato, Prisma } from '@prisma/client';
import { logger } from 'src/main';

@Injectable()
export class ContatoService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ContatoCreateInput) {
    const { telefone } = data;

    return this.prisma.contato.create({
      data: {
        ...data,
        telefone: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          create: telefone,
        },
      },
      include: {
        telefone: true,
      },
    });
  }

  findAll() {
    return this.prisma.contato.findMany({
      include: {
        telefone: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.contato.findUnique({
      where: { id },
      include: {
        telefone: true,
      },
    });
  }

  async findByName(nome: string): Promise<Contato[]> {
    return this.prisma.contato.findMany({
      where: {
        nome: {
          contains: nome,
        },
      },
      include: {
        telefone: true,
      },
    });
  }

  async findByTelefone(numero: string): Promise<Contato[]> {
    const contatos = await this.prisma.contato.findMany({
      where: {
        telefone: {
          some: {
            numero: {
              contains: numero,
            },
          },
        },
      },
      include: {
        telefone: true,
      },
    });

    return contatos;
  }

  async update(id: number, data: UpdateContatoDto) {
    try {
      const result = await this.prisma.contato.update({
        where: { id },
        data,
        include: {
          telefone: true,
        },
      });

      if (!result) {
        throw new NotFoundException(`Contato com id ${id} não encontrado`);
      }
      return result;
    } catch (error) {
      throw new Error(`Erro:  ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prisma.contato.delete({
        where: { id },
      });

      if (!result) {
        throw new NotFoundException(`Contato com id ${id} não encontrado`);
      }
      // chamada do logger
      const timestamp = new Date().toISOString();
      logger.info(`Contato com id ${id} foi removido no horário: ${timestamp}`);

      return `Contato com id ${id} removido com sucesso`;
    } catch (error) {
      throw new NotFoundException(`Erro ao remover o Contato com id ${id}`);
    }
  }
}
