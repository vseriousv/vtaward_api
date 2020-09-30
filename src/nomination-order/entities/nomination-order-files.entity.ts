import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { NominationOrderEntity } from './nomination-order.entity';

@Table({
  tableName: 'nomination_order_files',
})
export class NominationOrderFilesEntity extends Model<NominationOrderFilesEntity> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ field: 'file_path' })
  filePath: string;

  @ForeignKey(() => NominationOrderEntity)
  @Column({ field: 'nomination_order_id' })
  nominationOrderId: number;

  @BelongsTo(() => NominationOrderEntity)
  nominationOrder: NominationOrderEntity;
}
