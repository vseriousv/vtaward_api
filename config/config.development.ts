import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'postgres' as Dialect,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '19970708',
        database: 'test',
        logging: false,
    },
    jwtPrivateKey: 'jwtPrivateKey',
};
