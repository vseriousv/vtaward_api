import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { NominationOrderEntity } from '../../nomination-order/entities/nomination-order.entity';
import { UserVotingType } from '../../shared/enum/user-voting-type';

@Table({
  tableName: 'user_voting',
})
export class UserVotingEntity extends Model<UserVotingEntity> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_from_id' })
  userFromId: number;

  @ForeignKey(() => NominationOrderEntity)
  @Column({ field: 'nomination_order_id' })
  nominationOrderId: number;

  @Column
  range: number;

  @Column
  type: UserVotingType;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => NominationOrderEntity)
  nominationOrder: NominationOrderEntity;
}