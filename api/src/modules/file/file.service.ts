import {Injectable} from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import {config} from '~/config';

@Injectable()
export class FileService {
  constructor() {
    // create config.paths if not yet existing
    Object.values(config.path).forEach(path => !fs.existsSync(path) && fs.mkdirSync(path, {recursive: true}));
  }

  saveFileInTmp(file: Express.Multer.File) {
    const fileName = `${file.originalname}.${file.size}`;
    const filePath = path.join(config.path.tmpUpload, fileName);
    fs.writeFileSync(filePath, file.buffer);
    return fileName;
  }

  moveUploadedFile(fileName: string, targetDir: string) {
    const filePath = path.join(config.path.tmpUpload, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error('File not Found: ' + fileName);
    }
    const newFileName = fileName.substr(0, fileName.lastIndexOf('.'));
    const newPath = path.join(targetDir, newFileName);
    fs.renameSync(filePath, newPath);
    return {
      path: newPath,
      name: newFileName,
    };
  }

  // TODO: refactor for proper thumbnails
  async moveAndResizeUploadedFile(fileName: string, targetDir: string) {
    const filePath = path.join(config.path.tmpUpload, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error('File not Found: ' + fileName);
    }
    const newFileName = fileName.substr(0, fileName.lastIndexOf('.'));
    const newPath = path.join(targetDir, newFileName);

    const newImg = await sharp(filePath)
      .rotate()
      .resize(200)
      .jpeg({mozjpeg: true})
      .toBuffer();

    fs.writeFileSync(newPath, newImg);
    fs.rmSync(filePath);

    return {
      path: newPath,
      name: newFileName,
    };
  }
}
