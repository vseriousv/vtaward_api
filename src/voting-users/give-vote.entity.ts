import { Table, CreatedAt, UpdatedAt, Column, Model, Unique, HasOne, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';


@Table({
  tableName: 'giveVote',
})
export class giveVoteEntity extends Model<giveVoteEntity> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  user_id: number;


  @Column
  nomination_order_id: number;

  @CreatedAt
  @Column
  create_at: Date;

  @UpdatedAt
  @Column
  update_at: Date;

  @Column
  range: number;

}
