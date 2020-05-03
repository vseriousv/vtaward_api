import {
  Table,
  Column,
  Model,
} from 'sequelize-typescript';

@Table({
  tableName: 'sections',
})
export class Section extends Model<Section> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  value_ru: string;

  @Column
  value_en: string;

}
