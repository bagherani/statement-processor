import { createStream as createCsvStream } from 'csv-stream';
import { File } from '@statement-validator/models';

import {
  CsvRecordType,
  TransactionRecordCallback,
} from '../../types/record-types';
import { getFileStream } from '../../utils/file.stream';
import { TransactionReader } from '../transaction.reader';
import { CsvTransactionRecordOptions } from './csv.record.options';

export class CsvTransactionReader extends TransactionReader {
  read(file: File, callback: TransactionRecordCallback): void {
    getFileStream(file)
      .pipe(createCsvStream(CsvTransactionRecordOptions))
      .on('error', (err: Error) => {
        callback(err, null);
      })
      .on('data', (record: CsvRecordType) => {
        callback(null, {
          reference: record.Reference,
          startBalance: Number(record['Start Balance']),
          mutation: Number(record.Mutation),
          endBalance: Number(record['End Balance']),
        });
      })
      .on('end', () => {
        callback(null, null);
      });
  }
}
