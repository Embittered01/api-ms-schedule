import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { NotificationLog } from './notification-log.model';

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

@Table({
  tableName: 'notification_templates',
  timestamps: true,
  paranoid: true,
})
export class NotificationTemplate extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(120),
  })
  name!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(NotificationChannel)),
  })
  channel!: NotificationChannel;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(180),
  })
  subject?: string | null;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  body!: string;

  @Default(true)
  @AllowNull(false)
  @Column({
    field: 'is_active',
    type: DataType.BOOLEAN,
  })
  isActive!: boolean;

  @HasMany(() => NotificationLog)
  logs!: NotificationLog[];
}


