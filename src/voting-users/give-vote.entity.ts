import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';


@Table({
  tableName: 'giveVote',
})
export class GiveVoteEntity extends Model<GiveVoteEntity> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ field: 'user_id' })
  userId: number;


  @Column({ field: 'nomination_order_id' })
  nominationOrderId: number;

  @CreatedAt
  @Column({ field: 'create_at' })
  createAt: Date;

  @UpdatedAt
  @Column({ field: 'update_at' })
  updateAt: Date;

  @Column
  range: number;

}
