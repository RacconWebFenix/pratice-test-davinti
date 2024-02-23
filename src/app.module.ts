import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContatoModule } from './contato/contato.module';
import { TelefoneModule } from './telefone/telefone.module';

@Module({
  imports: [ContatoModule, TelefoneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
