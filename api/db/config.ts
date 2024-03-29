import dotenv from 'dotenv';

dotenv.config();

export const development = {
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  dialect: 'mysql',
};

export const show = development;
