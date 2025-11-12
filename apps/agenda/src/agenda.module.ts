import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonModule } from '@common';
import { DatabaseModule } from '@database';
import { Appointment, Client, User, Service } from '@database/models';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    SequelizeModule.forFeature([Appointment, Client, User, Service]),
  ],
  controllers: [AgendaController],
  providers: [AgendaService],
})
export class AgendaModule {}

