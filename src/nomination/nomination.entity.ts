import { Table, Column, Model, Unique } from 'sequelize-typescript';

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

  @Unique
  @Column
  code: string;
}
