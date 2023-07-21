import { CsvTransactionReader } from './csv/csv.transaction.reader';
import { TransactionReader } from './transaction.reader';
import { XmlTransactionReader } from './xml/xml.transaction.reader';

export enum TransactionsFileType {
  csv,
  xml
}

export class TransactionReaderFactory {
  static create(
    mode: TransactionsFileType = TransactionsFileType.csv
  ): TransactionReader {
    switch (mode) {
      case TransactionsFileType.csv:
        return new CsvTransactionReader();
      case TransactionsFileType.xml:
        return new XmlTransactionReader();
    }
  }
}
