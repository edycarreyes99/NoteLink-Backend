import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('NoteLink')
    .setDescription('Backend service for the "NoteLink" project.')
    .setVersion('1.0')
    .addBearerAuth()
    .setBasePath('/api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
