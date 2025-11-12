import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  Index,
  Table,
} from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { Role } from './role.model';
import { Appointment } from './appointment.model';
import { HasMany } from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export class User extends Model {
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
    type: DataType.STRING(180),
  })
  email!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  password!: string;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column({
    field: 'role_id',
    type: DataType.UUID,
  })
  roleId!: string;

  @BelongsTo(() => Role)
  role!: Role;

  @HasMany(() => Appointment)
  appointments!: Appointment[];
}


