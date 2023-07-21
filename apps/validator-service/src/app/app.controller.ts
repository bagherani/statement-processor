import { Controller, Get } from '@nestjs/common';
import { resolve as resolvePath } from 'path';

import { AppService } from './app.service';
import { TransactionValidator } from './services/transaction.validator';
import { TransactionsFileType } from './services/transaction.reader.factory';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('validate')
  async validate(): Promise<any> {
    return new Promise((resolve) => {
      const validator: TransactionValidator = new TransactionValidator(
        TransactionsFileType.xml
      );

      validator
        .validate(
          resolvePath(
            '/Users/mohi/Documents/git/statement-validator/apps/validator-service/src/app/services/__mocks__/records.xml'
          )
        )
        .on('done', (result) => {
          resolve(result);
        });
    });
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
