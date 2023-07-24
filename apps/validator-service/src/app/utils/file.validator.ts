import { HttpException, HttpStatus } from '@nestjs/common';

export const fileValidations = {
  fileFilter: (_, file, cb) => {
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
