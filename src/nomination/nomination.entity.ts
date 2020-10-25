import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'nominations',
})
export class Nomination extends Model<Nomination> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ field: 'value_ru' })
  valueRu: string;

  @Column({ field: 'value_en' })
  valueEn: string;
}
