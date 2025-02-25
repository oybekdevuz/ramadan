import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  app.use(cookieParser());
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle('Ramadan Calendar 2024')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .build();


  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(port, () => {
    console.log(port);
  });
}

bootstrap();
