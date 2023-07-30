import { resolve as resolvePath } from 'path';
import { readFileSync } from 'fs';
import { File } from '@statement-validator/models';

import {
  TransactionReaderFactory,
  TransactionsFileType,
} from '../../services/transaction.reader.factory';

it('Xml Stream', (done) => {
  const filename = resolvePath(__dirname, '../__mocks__/records.xml');

  const fn = jest.fn();

  TransactionReaderFactory.create(TransactionsFileType.xml)
    .read({ buffer: readFileSync(filename) } as File)
    .subscribe({
      next: fn,
      complete: () => {
        done();
        expect(fn).toBeCalledTimes(10);
      },
    });
});
