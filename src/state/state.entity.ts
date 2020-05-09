import { Table, Column, Model, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'states',
})
export class State extends Model<State> {
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
