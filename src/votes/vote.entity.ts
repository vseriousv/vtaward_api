import {
  Table,
  Column,
  Model, DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'votes',
})
export class Vote extends Model<Vote> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  user_from_id: number;

  @Column
  user_to_id: number;

  @Column
  type_voting: string;

  @Column
  count_vote: number;

}
