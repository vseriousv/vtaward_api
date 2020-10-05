import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { NominationOrderEntity } from '../nomination-order/entities/nomination-order.entity';

@Table({
  tableName: 'comments',
})
export class Comment extends Model<Comment> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => NominationOrderEntity)
  @Column({field: 'nomination_order_id'})
  nominationOrderId: number;

  @Column({field: 'user_to_id'})
  userFromId: number;

  @Column
  comment: string;

  @Column
  public: boolean;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => NominationOrderEntity)
  nominationOrder: NominationOrderEntity;
}
