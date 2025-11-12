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
import { User } from './user.model';

@Table({
  tableName: 'roles',
  timestamps: true,
  paranoid: true,
})
export class Role extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Index({ unique: true })
  @AllowNull(false)
  @Column({
    type: DataType.STRING(64),
  })
  code!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(120),
  })
  name!: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(255),
  })
  description?: string | null;

  @HasMany(() => User)
  users!: User[];
}


