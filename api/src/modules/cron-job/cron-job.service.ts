import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import fs from 'fs';
import path from 'path';
import {config} from '~/config';
import {AdminService} from '~/modules/admin/admin.service';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);

  constructor(private adminService: AdminService) {
  }


  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  purgeTempDirectory() {
    const maxAgeInHours = 24;

    const fileNames = fs.readdirSync(config.path.tmpUpload);
    const filePaths = fileNames.map(name => path.join(config.path.tmpUpload, name));
    const now = new Date();
    const maxAge = new Date();
    maxAge.setHours(now.getHours() - maxAgeInHours);

    const oldFiles = filePaths.filter(filePath => maxAge > fs.statSync(filePath).birthtime);

    if (oldFiles.length > 0) {
      this.logger.verbose('purge tmp-upload directory...');
      oldFiles.forEach(file => {
        fs.rmSync(file);
        this.logger.verbose(`removed file ${file}`);
      });
      this.logger.verbose('..purge complete');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async backup() {
    await this.adminService.backupData();
  }
}
