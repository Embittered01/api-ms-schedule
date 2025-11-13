import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  Appointment,
  Category,
  Client,
  NotificationLog,
  NotificationTemplate,
  Role,
  Service,
  User,
} from './models';
import { ScheduleDBConfig } from './config/database.config';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...ScheduleDBConfig(configService),
        models: [
          Role,
          User,
          Client,
          Category,
          Service,
          Appointment,
          NotificationTemplate,
          NotificationLog,
        ],
      }),
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
