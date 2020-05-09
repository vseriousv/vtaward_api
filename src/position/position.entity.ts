import { Table, Column, Model, Unique, HasOne, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({
  tableName: 'positions',
})
export class Position extends Model<Position> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  value_ru: string;

  @Column
  value_en: string;

  @HasMany(() => User )
  users: User[];
}
