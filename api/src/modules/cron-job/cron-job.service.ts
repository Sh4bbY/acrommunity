import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import fs from 'fs';
import path from 'path';
import {config} from '~/config';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async purgeTempDirectory() {
    const maxAgeInHours = 24;

    const fileNames = await fs.readdirSync(config.path.tmp);
    const filePaths = fileNames.map(name => path.join(config.path.tmp, name));
    const now = new Date();
    const maxAge = new Date();
    maxAge.setHours(now.getHours() - maxAgeInHours);

    const oldFiles = filePaths.filter(filePath => maxAge > fs.statSync(filePath).birthtime);

    if (oldFiles.length > 0) {
      this.logger.debug('purge tmp directory...');
      oldFiles.forEach(file => {
        fs.rmSync(file);
        this.logger.debug(`removed file ${file}`);
      });
      this.logger.debug('..purge complete');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async backup() {
    this.logger.warn('Todo: Implement daily backups');
    // TODO: implement me!
  }
}
