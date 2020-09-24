import { Column, CreatedAt, DataType, DeletedAt, ForeignKey, IsEmail, Model, Table, Unique, UpdatedAt } from 'sequelize-typescript';
import { Role } from '../shared/enum/role';
import { State } from '../state/state.entity';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @Unique
  @Column({ field: 'tab_number' })
  tabNumber: string;

  @Column({ field: 'firstname_ru' })
  firstnameRu: string;

  @Column({ field: 'firstname_en' })
  firstnameEn: string;

  @Column({ field: 'lastname_ru' })
  lastnameRu: string;

  @Column({ field: 'lastname_en' })
  lastnameEn: string;

  @Column({ field: 'patronymic_ru' })
  patronymicRu: string;

  @Column({ field: 'patronymic_en' })
  patronymicEn: string;

  @ForeignKey(() => State)
  @Column({ field: 'state_id' })
  stateId: number;

  @Column({
    type: DataType.ENUM(Role.admin, Role.comittee, Role.user),
    defaultValue: Role.user,
  })
  role: Role;

  @Column
  img :string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @Column({field: 'position_name'})
  positionName: string;

  @Column({field: 'city_name'})
  cityName: string;

  @Column({field: 'section_name'})
  sectionName: string;

  @Column({field: 'password_text'})
  passwordText: string;
}
