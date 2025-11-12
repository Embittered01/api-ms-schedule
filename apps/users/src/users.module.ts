import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonModule } from '@common';
import { DatabaseModule } from '@database';
import { User, Role } from '@database/models';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    SequelizeModule.forFeature([User, Role]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

