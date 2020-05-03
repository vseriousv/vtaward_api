import {
  Table,
  Column,
  Model, DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'participants',
})
export class Participant extends Model<Participant> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  user_id: number;

  @Column
  year_voting: number;

  @Column
  type_voting: string;

}
