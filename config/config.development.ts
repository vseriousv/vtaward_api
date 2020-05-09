import { Dialect } from 'sequelize/types';

export const  config = {
    database: {
        dialect: 'postgres' as Dialect,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '19970708',
        database: 'test',
        logging: false,
        define: {
            timestamps: false
        }
    },
    jwtPrivateKey: 'jwtPrivateKey',
    transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORDP,
        },
    },
    defaults: {
        from:`"" <${process.env.SMTP_USER}>`,
    },
};
