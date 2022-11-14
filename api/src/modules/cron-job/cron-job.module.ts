import {Module} from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule';
import {AdminModule} from '~/modules/admin/admin.module';
import {CronJobService} from './cron-job.service';

@Module({
  imports: [ScheduleModule.forRoot(), AdminModule],
  providers: [CronJobService],
  exports: [CronJobService],
})
export class CronJobModule {
}
