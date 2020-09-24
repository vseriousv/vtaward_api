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

  @Column({field: 'value_ru'})
  valueRu: string;

  @Column({field: 'value_en'})
  valueEn: string;
}
