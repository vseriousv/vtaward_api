import { Table, Column, Model, Unique, HasMany } from 'sequelize-typescript';
import { User } from '../users/user.entity';

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

  @HasMany(() => User )
  users: User[];
}
