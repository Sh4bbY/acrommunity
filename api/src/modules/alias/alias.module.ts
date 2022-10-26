import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Alias} from '~/models';
import {AliasService} from './alias.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Alias]),
  ],
  controllers: [],
  providers: [AliasService],
  exports: [AliasService],
})
export class AliasModule {
}
