import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Voting } from '../voting/voting.entity';

@Table({
  tableName: 'winners',
})
export class Winner extends Model<Winner> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Voting)
  @Column
  voting_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Voting)
  voting: Voting
}
