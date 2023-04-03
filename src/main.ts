import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3000;

    app.use(cookieParser());
    app.setGlobalPrefix('api');

    app.listen(PORT, () => {
      console.log(`Port: ${PORT}. Server is running...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();