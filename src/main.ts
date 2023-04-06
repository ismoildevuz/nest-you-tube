import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3000;

    app.use(cookieParser());
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('NestJS YouTube')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NodeJS, NestJS, Postgres, sequalize')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.listen(PORT, () => {
      console.log(`Port: ${PORT}. Server is running...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
