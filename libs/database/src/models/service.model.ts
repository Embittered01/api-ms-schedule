import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Index,
  Table,
} from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { Category } from './category.model';
import { Appointment } from './appointment.model';

@Table({
  tableName: 'services',
  timestamps: true,
  paranoid: true,
})
export class Service extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(150),
  })
  name!: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(255),
  })
  description?: string | null;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  price!: number;

  @AllowNull(true)
  @Column({
    field: 'duration_minutes',
    type: DataType.INTEGER,
  })
  durationMinutes?: number | null;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column({
    field: 'category_id',
    type: DataType.UUID,
  })
  categoryId!: string;

  @BelongsTo(() => Category)
  category!: Category;

  @HasMany(() => Appointment)
  appointments!: Appointment[];
}


