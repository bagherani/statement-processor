import { resolve as resolvePath } from 'path';
import { readFileSync } from 'fs';
import { File } from '@statement-validator/models';

import { TransactionValidator } from './transaction.validator';
import { TransactionsFileType } from './transaction.reader.factory';

it('validate xml file', () => {
  const filename = resolvePath(__dirname, './__mocks__/records.xml');

  new TransactionValidator(TransactionsFileType.xml)
    .validate({ buffer: readFileSync(filename) } as File)
    .subscribe((result) => {
      expect(result.duplicatedReferences['138932']).toBe(2);
      expect(result.duplicatedReferences['154771']).toBe(2);
      expect(result.invalidRecords['131254']).toBeTruthy();
      expect(result.invalidRecords['152977']).toBeTruthy();
      expect(result.invalidRecords['192480']).toBeTruthy();
    });
});

it('validate csv file', () => {
  const filename = resolvePath(__dirname, './__mocks__/records.csv');
  new TransactionValidator(TransactionsFileType.csv)
    .validate({ buffer: readFileSync(filename) } as File)
    .subscribe((result) => {
      expect(result.duplicatedReferences['138932']).toBe(2);
      expect(result.duplicatedReferences['154771']).toBe(2);
      expect(result.invalidRecords['141007']).toBeTruthy();
    });
});
