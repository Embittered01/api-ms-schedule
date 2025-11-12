import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonModule } from '@common';
import { DatabaseModule } from '@database';
import { Category, Service } from '@database/models';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    SequelizeModule.forFeature([Category, Service]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}

