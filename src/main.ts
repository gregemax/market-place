import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', 
    methods: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Authorization', 
    credentials: true, 
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }),)
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
 // await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
