import {Injectable} from '@nestjs/common';
import fs from 'fs';
import {config} from '~/config';

@Injectable()
export class FileService {
  constructor() {
    // create config.paths if not yet existing
    Object.values(config.path).forEach(path => !fs.existsSync(path) && fs.mkdirSync(path, {recursive: true}));
  }
}
