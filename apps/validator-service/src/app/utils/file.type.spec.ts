import { File } from '@statement-validator/models';
import { getTransactionFileType } from './file.type';
import { TransactionsFileType } from '../services/transaction.reader.factory';

describe('getTransactionFileType', () => {
  it('should return TransactionsFileType.xml if the file is XML', () => {
    const mockFile = { mimetype: 'application/xml' } as File;
    const result = getTransactionFileType(mockFile);

    expect(result).toBe(TransactionsFileType.xml);
  });

  it('should return TransactionsFileType.csv if the file is CSV', () => {
    const mockFile = { mimetype: 'text/csv' } as File;
    const result = getTransactionFileType(mockFile);

    expect(result).toBe(TransactionsFileType.csv);
  });

  it('should return TransactionsFileType.csv if the file mimetype is not recognized', () => {
    const mockFile = { mimetype: 'font/woff' } as File;
    const result = getTransactionFileType(mockFile);

    expect(result).toBe(TransactionsFileType.csv);
  });
});
