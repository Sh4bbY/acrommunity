import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {json, urlencoded} from 'body-parser';
import cookieParser from 'cookie-parser';
import bearerToken from 'express-bearer-token';
import helmet from 'helmet';
import * as pkg from '../package.json';
import {AppModule} from './app.module';
import {config} from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(bearerToken());
  app.use(helmet());
  app.use(json());
  app.use(urlencoded({extended: true}));

  await app.listen(config.port);
}

bootstrap()
  .then(() => Logger.log(`${pkg.name} is listening on port ${config.port}`))
  .catch(err => {
    Logger.error('API failed to start!');
    console.log(err);
  });
