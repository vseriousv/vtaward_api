import { Table, Column, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'content_main',
})
export class ContentMain extends Model<ContentMain> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  name_ru: string;

  @Column
  name_en: string;

  @Column
  position_ru: string;

  @Column
  position_en: string;

  @Column
  text_ru: string;

  @Column
  text_en: string;

  @Column
  image: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

}
