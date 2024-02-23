import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';
import { Contato } from '@prisma/client';

@Controller('contato')
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  @Post()
  create(@Body() createContatoDto: CreateContatoDto) {
    return this.contatoService.create(createContatoDto);
  }

  @Get()
  findAll() {
    return this.contatoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contatoService.findOne(+id);
  }

  @Get('search/:nome')
  async findByName(@Param('nome') nome: string): Promise<Contato[]> {
    return this.contatoService.findByName(nome);
  }

  @Get('telefone/:numero')
  async findByTelefone(
    @Param('numero') numero: string,
  ): Promise<Contato[] | null> {
    return this.contatoService.findByTelefone(numero);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContatoDto: UpdateContatoDto) {
    return this.contatoService.update(+id, updateContatoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.contatoService.remove(+id);
  }
}
