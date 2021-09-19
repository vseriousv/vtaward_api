import { Dialect } from 'sequelize/types';
import env from 'dotenv';
env.config();

export const config = {
	dirFiles: process.env.DIR_FILES || '../files/avatars',
	dirFilesAvatar: process.env.DIR_FILES_AVATAR || '../files/avatars',
	database: {
		dialect: 'postgres' as Dialect,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DATABASE,
		logging: false,
		define: {
			timestamps: false
		}
	},
	jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
	transport: {
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false,
		ignoreTLS: true,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	},
	defaults: {
		from:`"" <${process.env.SMTP_USER}>`,
	},
};
