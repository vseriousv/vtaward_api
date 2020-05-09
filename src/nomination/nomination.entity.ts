import { Table, Column, Model, Unique, HasMany } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({
  tableName: 'nominations',
})
export class Nomination extends Model<Nomination> {
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
