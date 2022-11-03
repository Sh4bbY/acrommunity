import {Module} from '@nestjs/common';
import {APP_FILTER, APP_INTERCEPTOR} from '@nestjs/core';
import {SequelizeModule} from '@nestjs/sequelize';
import {ServeStaticModule} from '@nestjs/serve-static';
import {config, sequelizeOptions} from '~/config';
import {models} from '~/models';
import {AcroQuizModule} from '~/modules/acro-quiz/acro-quiz.module';
import {AcroletteModule} from '~/modules/acrolette/acrolette.module';
import {AdminModule} from '~/modules/admin/admin.module';
import {AuthModule} from '~/modules/auth/auth.module';
import {CommentModule} from '~/modules/comment/comment.module';
import {CronJobModule} from '~/modules/cron-job/cron-job.module';
import {EmailModule} from '~/modules/email/email.module';
import {FileModule} from '~/modules/file/file.module';
import {FlowGeneratorModule} from '~/modules/flow-generator/flow-generator.module';
import {FlowModule} from '~/modules/flow/flow.module';
import {GeolocationModule} from '~/modules/geolocation/geolocation.module';
import {HomeModule} from '~/modules/home/home.module';
import {ImageModule} from '~/modules/image/image.module';
import {JamModule} from '~/modules/jam/jam.module';
import {MyModule} from '~/modules/my/my.module';
import {PoseModule} from '~/modules/pose/pose.module';
import {ProfileModule} from '~/modules/profile/profile.module';
import {ProxyModule} from '~/modules/proxy/proxy.module';
import {SkillModule} from '~/modules/skill/skill.module';
import {UserModule} from '~/modules/user/user.module';
import {VideoModule} from '~/modules/video/video.module';
import {LoggingInterceptor} from '~/utils/nest/logging.interceptor';
import {SequelizeExceptionFilter} from '~/utils/nest/sequelize-exception-filter';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: config.path.static,
      renderPath: 'assets',
    }),
    SequelizeModule.forRoot(sequelizeOptions(models)),
    EmailModule,
    CronJobModule,
    AuthModule,
    ProfileModule,
    FileModule,
    PoseModule,
    GeolocationModule,
    JamModule,
    CommentModule,
    FlowModule,
    SkillModule,
    AcroletteModule,
    AcroQuizModule,
    UserModule,
    MyModule,
    ProxyModule,
    FlowGeneratorModule,
    AdminModule,
    ImageModule,
    VideoModule,
    HomeModule,
  ],
  controllers: [],
  providers: [
    {provide: APP_INTERCEPTOR, useClass: LoggingInterceptor},
    {provide: APP_FILTER, useClass: SequelizeExceptionFilter},
  ],
})
export class AppModule {
}
