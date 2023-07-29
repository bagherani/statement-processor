import { File } from '@statement-validator/models';
import { TransactionsFileType } from '../services/transaction.reader.factory';

export function getTransactionFileType(file: File): TransactionsFileType {
  return file.mimetype.match(/\/(xml)$/)
    ? TransactionsFileType.xml
    : TransactionsFileType.csv;
}
