import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe ({
      transform: true, // usado para transformar dados (exemplo de JSON para objeto)
      whitelist: true, // remove propriedades não whitelist
      forbidNonWhitelisted: true // gera erro para propriedades westlist
    }))

  app.enableCors({
    origin: 'http://localhost:3000', // URL do frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

    useContainer(app.select(AppModule), { fallbackOnErrors: true }); // faz com que a classe "class-validator" considere todas as dependências desde a raiz do projeto

  await app.listen(3001);
}
bootstrap();
