import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Nomination } from '../nomination/nomination.entity';
import { NominationOrderFilesEntity } from '../nomination-order/nomination-order-files.entity';

@Table({
  tableName: 'nomination_order',
})
export class NominationOrderEntity extends Model<NominationOrderEntity> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_from' })
  userFrom: number;

  @ForeignKey(() => Nomination)
  @Column({ field: 'nomination_id' })
  nominationId: number;

  @Column({ field: 'text_ru' })
  textRu: string;

  @Column({ field: 'text_en' })
  textEn: string;

  @Column({ field: 'public' })
  public: boolean;

  @Column({ field: 'is_new' })
  isNew: boolean;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => User)
  userOrder: User;

  @BelongsTo(() => Nomination)
  nomination: Nomination

  @HasMany(() => NominationOrderFilesEntity)
  files: NominationOrderFilesEntity[]

}
