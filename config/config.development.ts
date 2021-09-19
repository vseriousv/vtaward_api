import { Dialect } from 'sequelize/types';
import * as dotenv from "dotenv";

dotenv.config();
export const  config = {
	dirFiles: process.env.DIR_FILES || '../files/avatars',
	dirFilesAvatar: process.env.DIR_FILES_AVATAR || '../files/avatars',
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
		ignoreTLS: true,
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	},
	defaults: {
		from:`"" <${process.env.SMTP_USER}>`,
	},
};
