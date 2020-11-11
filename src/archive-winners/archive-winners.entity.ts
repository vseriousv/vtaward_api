import { Model, Table, Column, } from 'sequelize-typescript';

@Table({
	tableName: 'archive_winners',
})
export class ArchiveWinnersEntity extends Model<ArchiveWinnersEntity> {
	@Column({
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column
	img: string;

	@Column
	name: string;

	@Column
	year: number;

	@Column
	position: string;

	@Column
	city: string;
}