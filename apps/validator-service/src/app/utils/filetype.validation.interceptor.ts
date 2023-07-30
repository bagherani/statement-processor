import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { File } from '@statement-validator/models';

export const fileTypeValidationInterceptor: MulterOptions = {
  fileFilter: (
    _: unknown,
    file: File,
    callback: (err: Error, result: boolean) => void
  ) => {
    if (file.mimetype.match(/\/(xml|csv)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(`Unsupported file type`, HttpStatus.BAD_REQUEST),
        false
      );
    }
  },
};
