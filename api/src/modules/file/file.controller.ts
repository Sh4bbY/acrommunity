import {Controller, Post, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {Request} from 'express';
import {FileService} from './file.service';

@Controller('/api/file')
export class FileController {
  constructor(private readonly fileService: FileService) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  handleUpload(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
    const ref = this.fileService.saveFileInTmp(file);
    return {ref};
  }
}
