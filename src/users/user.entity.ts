import {
    Table,
    Column,
    Model,
    Unique,
    IsEmail,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
} from 'sequelize-typescript';
// import { Gender } from './../shared/enum/gender';
import { Role } from './../shared/enum/role';

@Table({
    tableName: 'user',
})
export class User extends Model<User> {
    @Column({
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column
    password: string;

    @Column({ field: 'name_ru' })
    name_ru: string;

    @Column({ field: 'name_en' })
    name_en: string;

    @Column({ field: 'position_ru' })
    position_ru: string;

    @Column({ field: 'position_en' })
    position_en: string;

    @Column({ field: 'section_ru' })
    section_ru: string;

    @Column({ field: 'section_en' })
    section_en: string;

    @Column({ field: 'state_ru' })
    state_ru: string;

    @Column({ field: 'state_en' })
    state_en: string;

    @Column({ field: 'city_ru' })
    city_ru: string;

    @Column({ field: 'city_en' })
    city_en: string;

    @Column({ field: 'nomination_ru' })
    nomination_ru: string;

    @Column({ field: 'nomination_en' })
    nomination_en: string;

    @Column({ field: 'count_z', defaultValue:0 })
    count_z: string;

    @Column({ field: 'description_ru' })
    description_ru: string;

    @Column({ field: 'description_en' })
    description_en: string;

    @Column({ type: DataType.ENUM(Role.admin, Role.comittee, Role.user), defaultValue: Role.user })
    role: Role;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at'})
    deletedAt: Date;
}
