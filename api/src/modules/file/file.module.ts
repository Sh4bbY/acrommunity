import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {FileController} from './file.controller';
import {FileService} from './file.service';

@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {
}
