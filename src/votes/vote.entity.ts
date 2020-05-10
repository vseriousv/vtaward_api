import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({
  tableName: 'votes',
})
export class Vote extends Model<Vote> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_from_id: number;

  @ForeignKey(() => User)
  @Column
  user_to_id: number;

  @Column
  type_vote: string;

  @Column
  count_vote: number;

  @Column
  voting_id: number;

  // @BelongsTo(() => User)
  // userFrom: User;

  @BelongsTo(() => User)
  userTo: User;
}
