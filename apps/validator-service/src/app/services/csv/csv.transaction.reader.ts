import { createStream as createCsvStream } from 'csv-stream';

import { TransactionRecordCallback } from '../../types/record-types';
import { getFileStream } from '../../utils/file.stream';
import { TransactionReader } from '../transaction.reader';
import { CsvTransactionRecordOptions } from './csv.record.options';

export class CsvTransactionReader extends TransactionReader {
  read(filename: string, callback: TransactionRecordCallback): void {
    getFileStream(filename, null)
      .pipe(createCsvStream(CsvTransactionRecordOptions))
      .on('error', err => {
        callback(err, null);
      })
      .on('data', data => {
        callback(null, {
          reference: data.Reference,
          startBalance: Number(data['Start Balance']),
          mutation: Number(data.Mutation),
          endBalance: Number(data['End Balance'])
        });
      })
      .on('end', () => {
        callback(null, null);
      });
  }
}
