import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  
  // CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log('🚀 Backend rodando em http://localhost:' + port);
  console.log('✅ Validação automática ativada');
  console.log('🌐 WebSocket disponível em ws://localhost:' + port);
}

bootstrap();
