import {Logger} from '@nestjs/common';
import {SequelizeModuleOptions} from '@nestjs/sequelize';
import dotenv from 'dotenv';
import path from 'path';
import {ModelCtor} from 'sequelize-typescript';

// load env-variables from /.env
dotenv.config();

const DOMAIN = process.env.DOMAIN;
const ROOT_DIR = process.cwd();

export const config = {
  production: process.env.NODE_ENV === 'production',
  port: process.env.PORT,
  jwt: {
    issuer: DOMAIN,
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    },
  },
  sql: {
    host: process.env.SQL_HOST,
    port: Number(process.env.SQL_PORT),
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
  },
  email: {
    senderAddress: `info@${DOMAIN}`,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
  path: {
    root: ROOT_DIR,
    static: path.join(ROOT_DIR, '/static'),
    tmp: path.join(ROOT_DIR, '/static/tmp'),
    tmpUpload: path.join(ROOT_DIR, '/static/tmp/upload'),
    tmpChunks: path.join(ROOT_DIR, '/static/tmp/chunks'),
  },
};

export function sequelizeOptions(models: ModelCtor[] = []): SequelizeModuleOptions {
  return {
    dialect: 'mysql',
    host: config.sql.host,
    port: config.sql.port,
    username: config.sql.username,
    password: config.sql.password,
    database: config.sql.database,
    logging: config.production ? false : (msg: string) => Logger.debug(msg),
    query: {
      nest: true,
    },
    models,
  };
}
