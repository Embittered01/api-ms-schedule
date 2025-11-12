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
import { Service } from './service.model';
import { Client } from './client.model';
import { User } from './user.model';

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  CASH = 'cash',
  DEBIT_CARD = 'debit_card',
  CREDIT_CARD = 'credit_card',
  GIFT_CARD = 'gift_card',
  TRANSFER = 'transfer',
  OTHER = 'other',
}

@Table({
  tableName: 'appointments',
  timestamps: true,
  paranoid: true,
})
export class Appointment extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Service)
  @AllowNull(false)
  @Column({
    field: 'service_id',
    type: DataType.UUID,
  })
  serviceId!: string;

  @BelongsTo(() => Service)
  service!: Service;

  @ForeignKey(() => Client)
  @AllowNull(false)
  @Column({
    field: 'client_id',
    type: DataType.UUID,
  })
  clientId!: string;

  @BelongsTo(() => Client)
  client!: Client;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    field: 'user_id',
    type: DataType.UUID,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @AllowNull(false)
  @Column({
    field: 'scheduled_at',
    type: DataType.DATE,
  })
  scheduledAt!: Date;

  @Default(AppointmentStatus.SCHEDULED)
  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(AppointmentStatus)),
  })
  status!: AppointmentStatus;

  @AllowNull(false)
  @Column({
    field: 'payment_method',
    type: DataType.ENUM(...Object.values(PaymentMethod)),
  })
  paymentMethod!: PaymentMethod;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(255),
  })
  note?: string | null;

  @AllowNull(true)
  @Column({
    field: 'cancel_reason',
    type: DataType.STRING(255),
  })
  cancelReason?: string | null;

  @AllowNull(true)
  @Column({
    field: 'created_by',
    type: DataType.UUID,
  })
  createdBy?: string | null;
}

