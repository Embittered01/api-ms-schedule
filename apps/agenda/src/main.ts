import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AgendaModule } from './agenda.module';

async function bootstrap() {
  const app = await NestFactory.create(AgendaModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3004);

  await app.listen(port);
  Logger.log(`Agenda service running on port ${port}`, 'Bootstrap');
}

bootstrap();

