import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from '@statement-validator/models';

import { TransactionsFileType } from './services/transaction.reader.factory';
import { TransactionValidator } from './services/transaction.validator';
import { fileValidations } from './utils/file.validator';
import { ValidationResponse } from '@statement-validator/models';

@Controller()
export class AppController {
  @Post('validate')
  @UseInterceptors(FileInterceptor('file', fileValidations))
  async validate(@UploadedFile() file: File): Promise<ValidationResponse> {
    return new Promise((resolve) => {
      const validator: TransactionValidator = new TransactionValidator(
        file.mimetype.match(/\/(xml)$/)
          ? TransactionsFileType.xml
          : TransactionsFileType.csv
      );

      validator.validate(file).on('done', (result) => {
        resolve(result);
      });
    });
  }
}
