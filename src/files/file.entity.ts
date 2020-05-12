import { Table, Column, Model, Unique, HasMany } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({
  tableName: 'files',
})
export class File extends Model<File> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  file_name: string;

  @Column
  file_type: string;

  @Column
  file_src: string;

  @HasMany(() => User )
  users: User[];
}
