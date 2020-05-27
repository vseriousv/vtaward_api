import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'feedback_form',
})
export class FeedbackForm extends Model<FeedbackForm> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  text: string;

  @Column({ field: 'is_active' })
  isActive: boolean;
}