import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {List, User} from '~/models';
import {PT_Listable} from '~/models/pivot';
import {MyController} from './my.controller';
import {MyService} from './my.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, List, PT_Listable]),
  ],
  controllers: [MyController],
  providers: [MyService],
  exports: [MyService],
})
export class MyModule {
}
