import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonModule } from '@common';
import { DatabaseModule } from '@database';
import {
  NotificationLog,
  NotificationTemplate,
  Client,
  Appointment,
} from '@database/models';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    SequelizeModule.forFeature([
      Appointment,
      Client,
      NotificationLog,
      NotificationTemplate,
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}

