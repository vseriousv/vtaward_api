import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Voting } from '../voting/voting.entity';
import { Nomination } from '../nomination/nomination.entity';

@Table({
  tableName: 'participants',
})
export class Participant extends Model<Participant> {
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
