import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';

const {RUN_HOST, RUN_PORT} = process.env;
const host = RUN_HOST || '127.0.0.1';
const port = +RUN_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.enableCors(
  //   {
  //     origin: '*',
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //     credentials: true,
  //     allowedHeaders: '*',
  //   }
  // );
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(port, host);
}

bootstrap();
