// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS ayarlarını etkinleştir
  app.enableCors({
    origin: [
      'http://localhost:5173', // Vite default portu
      'http://localhost:3000', // Create React App default portu
      'http://127.0.0.1:5173',
      'https://your-frontend-domain.vercel.app', // Production domain
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend server running on http://localhost:${port}`);
}
bootstrap();
