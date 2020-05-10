import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt, HasOne, BelongsTo, ForeignKey, HasMany,
} from 'sequelize-typescript';
import { Role } from './../shared/enum/role';
import { Position } from '../position/position.entity';
import { Section } from '../section/section.entity';
import { State } from '../state/state.entity';
import { City } from '../city/city.entity';
import { Nomination } from '../nomination/nomination.entity';
import { Participant } from '../participants/participant.entity';
import { Vote } from '../votes/vote.entity';

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
  tab_number: string;

  @Column({ field: 'firstname_ru' })
  firstname_ru: string;

  @Column({ field: 'firstname_en' })
  firstname_en: string;

  @Column({ field: 'lastname_ru' })
  lastname_ru: string;
  @Column({ field: 'lastname_en' })
  lastname_en: string;

  @Column({ field: 'patronymic_ru' })
  patronymic_ru: string;

  @Column({ field: 'patronymic_en' })
  patronymic_en: string;

  @ForeignKey(() => Position)
  @Column({ field: 'position_id' })
  position_id: number;

  @ForeignKey(() => Section)
  @Column({ field: 'section_id' })
  section_id: number;

  @ForeignKey(() => State)
  @Column({ field: 'state_id' })
  state_id: number;

  @ForeignKey(() => City)
  @Column({ field: 'city_id' })
  city_id: number;

  @ForeignKey(() => Nomination)
  @Column({ field: 'nomination_id' })
  nomination_id: number;

  @Column({ field: 'count_z', defaultValue: 0 })
  count_z: number;

  @Column({ field: 'description_ru' })
  description_ru: string;

  @Column({ field: 'description_en' })
  description_en: string;

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

  @BelongsTo(() => Position)
  position: Position;

  @BelongsTo(() => Section)
  section: Section;

  @BelongsTo(() => State)
  state: State;

  @BelongsTo(() => City)
  city: City;

  @BelongsTo(() => Nomination)
  nomination: Nomination;

  @HasMany(() => Participant)
  participants: Participant[];

  @HasMany(() => Vote)
  votes: Vote[];

}
