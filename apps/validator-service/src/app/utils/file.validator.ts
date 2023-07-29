import { HttpException, HttpStatus } from '@nestjs/common';
import { File } from '@statement-validator/models';

export const fileValidations = {
  fileFilter: (
    _: Express.Request,
    file: File,
    cb: (err: Error, result: boolean) => void
  ) => {
    if (file.mimetype.match(/\/(xml|csv)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(`Unsupported file type`, HttpStatus.BAD_REQUEST),
        false
      );
    }
  },
};
