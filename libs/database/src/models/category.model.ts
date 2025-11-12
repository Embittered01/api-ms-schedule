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
import { Service } from './service.model';

@Table({
  tableName: 'categories',
  timestamps: true,
  paranoid: true,
})
export class Category extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Index({ unique: true })
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

  @AllowNull(true)
  @Column({
    field: 'display_order',
    type: DataType.INTEGER,
  })
  displayOrder?: number | null;

  @HasMany(() => Service)
  services!: Service[];
}


