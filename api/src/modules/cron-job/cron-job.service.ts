import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);

  constructor() {
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async purgeTempDirectory() {
    this.logger.warn('Todo: Implement tmp purge');
    // TODO: implement me!
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async backup() {
    this.logger.warn('Todo: Implement daily backups');
    // TODO: implement me!
  }
}
