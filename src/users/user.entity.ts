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
    @Column ({field: 'tab_number'})
    tab_number: string;

    @Column({ field: 'firstname_ru' })
    firstname_ru: string;

    @Column({ field: 'firstname_en' })
    firstname_en: string;

    @Column({ field: 'lastname_ru' })
    lastname_ru: string
    @Column({ field: 'lastname_en' })
    lastname_en: string;

    @Column({ field: 'patronymic_ru' })
    patronymic_ru: string;

    @Column({ field: 'patronymic_en' })
    patronymic_en: string;

    @Column({ field: 'position_id' })
    position_id: number;

    @Column({ field: 'section_id' })
    section_id: number;

    @Column({ field: 'state_id' })
    state_id: number;

    @Column({ field: 'city_id' })
    city_id: number;

    @Column({ field: 'nomination_id' })
    nomination_id: number;

    @Column({ field: 'count_z', defaultValue:0 })
    count_z: number;

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
