import { Table, Column, Model, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'cities',
})
export class City extends Model<City> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  state_id: number;

  @Column
  value_ru: string;

  @Column
  value_en: string;

  @Unique
  @Column
  code: string;
}
