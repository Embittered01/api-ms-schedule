import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppointmentModule } from './appointment.module';

async function bootstrap() {
  const app = await NestFactory.create(AppointmentModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3004);

  await app.listen(port);
  Logger.log(`Appointment service running on port ${port}`, 'Bootstrap');
}

bootstrap();

