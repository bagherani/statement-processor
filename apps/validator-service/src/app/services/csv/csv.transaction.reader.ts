import { createStream as createCsvStream } from 'csv-stream';
import { File, TransactionRecord } from '@statement-validator/models';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

import { CsvRecordType } from '../../types/record-types';
import { getFileStream } from '../../utils/file.stream';
import { TransactionReader } from '../transaction.reader';
import { CsvTransactionRecordOptions } from './csv.record.options';

export class CsvTransactionReader extends TransactionReader {
  private subject = new Subject<TransactionRecord>();

  read(file: File): Observable<TransactionRecord> {
    getFileStream(file)
      .pipe(createCsvStream(CsvTransactionRecordOptions))
      .on('error', (err: Error) => {
        this.subject.error(err);
      })
      .on('data', (record: CsvRecordType) => {
        this.subject.next({
          reference: record.Reference,
          startBalance: Number(record['Start Balance']),
          mutation: Number(record.Mutation),
          endBalance: Number(record['End Balance']),
        });
      })
      .on('end', () => {
        this.subject.complete();
      });

    return this.subject;
  }
}
