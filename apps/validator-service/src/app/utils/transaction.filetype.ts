import { File } from '@statement-validator/models';
import { TransactionsFileType } from '../services/transaction.reader.factory';

export const getTransactionFileType = (file: File): TransactionsFileType => {
  return file.mimetype.match(/\/(xml)$/)
    ? TransactionsFileType.xml
    : TransactionsFileType.csv;
};
