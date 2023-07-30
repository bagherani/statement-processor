import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from '@statement-validator/models';

import { TransactionValidator } from './services/transaction.validator';
import { fileTypeValidationInterceptor } from './utils/filetype.validation.interceptor';
import { ValidationResponse } from '@statement-validator/models';
import { getTransactionFileType } from './utils/transaction.filetype';

@Controller()
export class AppController {
  @Post('validate')
  @UseInterceptors(FileInterceptor('file', fileTypeValidationInterceptor))
  validate(@UploadedFile() file: File): Promise<ValidationResponse> {
    return new Promise((resolve) => {
      const validator: TransactionValidator = new TransactionValidator(
        getTransactionFileType(file)
      );

      validator.validate(file).subscribe((result) => {
        resolve(result);
      });
    });
  }
}
