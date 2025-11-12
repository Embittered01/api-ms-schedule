import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Index,
  Table,
} from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { Appointment } from './appointment.model';

@Table({
  tableName: 'clients',
  timestamps: true,
  paranoid: true,
})
export class Client extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @AllowNull(false)
  @Column({
    field: 'first_name',
    type: DataType.STRING(120),
  })
  firstName!: string;

  @AllowNull(false)
  @Column({
    field: 'last_name',
    type: DataType.STRING(120),
  })
  lastName!: string;

  @Index({ unique: true })
  @AllowNull(false)
  @Column({
    type: DataType.STRING(15),
  })
  rut!: string;

  @Index({ unique: true })
  @AllowNull(false)
  @Column({
    type: DataType.STRING(180),
  })
  email!: string;

  @AllowNull(true)
  @Column({
    field: 'phone_number',
    type: DataType.STRING(32),
  })
  phoneNumber?: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(255),
  })
  notes?: string | null;

  @HasMany(() => Appointment)
  appointments!: Appointment[];
}

