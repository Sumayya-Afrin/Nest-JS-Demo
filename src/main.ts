import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URI, {});
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectToDatabase();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
