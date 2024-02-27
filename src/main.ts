import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import * as cors from 'cors';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'LOG.txt' })],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );

    // Se a solicitação for OPTIONS, responda imediatamente com status 200 OK
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    next();
  });

  await app.listen(3000);
}
bootstrap();
