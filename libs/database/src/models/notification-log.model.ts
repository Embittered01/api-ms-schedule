import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { NotificationTemplate } from './notification-template.model';
import { Client } from './client.model';
import { Appointment } from './appointment.model';

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

@Table({
  tableName: 'notification_logs',
  timestamps: true,
  paranoid: true,
})
export class NotificationLog extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => NotificationTemplate)
  @AllowNull(false)
  @Column({
    field: 'template_id',
    type: DataType.UUID,
  })
  templateId!: string;

  @BelongsTo(() => NotificationTemplate)
  template!: NotificationTemplate;

  @ForeignKey(() => Client)
  @AllowNull(true)
  @Column({
    field: 'client_id',
    type: DataType.UUID,
  })
  clientId?: string | null;

  @BelongsTo(() => Client)
  client?: Client | null;

  @ForeignKey(() => Appointment)
  @AllowNull(true)
  @Column({
    field: 'appointment_id',
    type: DataType.UUID,
  })
  appointmentId?: string | null;

  @BelongsTo(() => Appointment)
  appointment?: Appointment | null;

  @AllowNull(false)
  @Column({
    field: 'recipient_contact',
    type: DataType.STRING(180),
  })
  recipientContact!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(NotificationStatus)),
  })
  status!: NotificationStatus;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  attempts!: number;

  @AllowNull(true)
  @Column({
    field: 'last_attempt_at',
    type: DataType.DATE,
  })
  lastAttemptAt?: Date | null;

  @AllowNull(true)
  @Column({
    field: 'sent_at',
    type: DataType.DATE,
  })
  sentAt?: Date | null;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
  })
  error?: string | null;
}


