import { resolve as resolvePath } from 'path';
import { readFileSync } from 'fs';
import { File } from '@statement-validator/models';

import {
  TransactionReaderFactory,
  TransactionsFileType,
} from '../../services/transaction.reader.factory';

it('CSV Stream', (done) => {
  const filename = resolvePath(__dirname, '../__mocks__/records.csv');

  const fn = jest.fn().mockImplementation((error, res) => {
    if (res === null && error === null) {
      done();
      expect(fn).toBeCalledTimes(11);
    }
  });

  TransactionReaderFactory.create(TransactionsFileType.csv).read(
    { buffer: readFileSync(filename) } as File,
    fn
  );
});
