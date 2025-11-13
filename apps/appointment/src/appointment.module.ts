import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonModule } from '@common';
import { DatabaseModule } from '@database';
import { Appointment, Client, User, Service } from '@database/models';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    SequelizeModule.forFeature([Appointment, Client, User, Service]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}

