import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Voting } from '../voting/voting.entity';

@Table({
  tableName: 'comments',
})
export class Comment extends Model<Comment> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_from_id: number;

  @Column
  user_to_id: number;

  @Column
  comment: string;

  @BelongsTo(() => User)
  userFrom: User;
}
