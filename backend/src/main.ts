import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // Enable CORS for frontend development
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the application')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend server running on http://localhost:${port}`);
}
bootstrap();
