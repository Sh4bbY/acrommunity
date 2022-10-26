import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Tag} from '~/models';
import {PT_Taggable} from '~/models/pivot';
import {TagService} from './tag.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Tag, PT_Taggable]),
  ],
  controllers: [],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {
}
