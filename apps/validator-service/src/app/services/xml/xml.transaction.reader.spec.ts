import { resolve as resolvePath } from 'path';
import { readFileSync } from 'fs';

import {
  TransactionReaderFactory,
  TransactionsFileType,
} from '../../services/transaction.reader.factory';

it('Xml Stream', (done) => {
  const filename = resolvePath(__dirname, '../__mocks__/records.xml');

  const fn = jest.fn().mockImplementation((error, res) => {
    if (res === null && error === null) {
      done();
      expect(fn).toBeCalledTimes(11);
    }
  });

  TransactionReaderFactory.create(TransactionsFileType.xml).read(
    { buffer: readFileSync(filename) } as Express.Multer.File,
    fn
  );
});
