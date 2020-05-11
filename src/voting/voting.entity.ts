import { Table, Column, Model, Unique, HasOne, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Vote } from '../votes/vote.entity';
import { Participant } from '../participants/participant.entity';

@Table({
  tableName: 'votings',
})
export class Voting extends Model<Voting> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  year: number;

  @Column
  type_voting: string;

  @Column
  is_active: boolean;

  @HasMany(() => Participant )
  participants: Participant[];

  @HasMany(() => Vote )
  votes: Vote[];
}
