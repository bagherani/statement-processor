import XmlStream from 'xml-stream';
import { File, TransactionRecord } from '@statement-validator/models';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

import { RawTransactionRecord } from '../../types/record-types';
import { getFileStream } from '../../utils/file.stream';
import { TransactionReader } from '../transaction.reader';

export class XmlTransactionReader extends TransactionReader {
  private subject = new Subject<TransactionRecord>();

  read(file: File): Observable<TransactionRecord> {
    const fileStream = getFileStream(file);
    const xml = new XmlStream(fileStream);

    xml.preserve('records', true);
    xml.collect('records');

    xml.on('endElement: record', (record: RawTransactionRecord) => {
      this.subject.next({
        reference: record.$.reference,
        startBalance: Number(record.startBalance.$text),
        mutation: Number(record.mutation.$text),
        endBalance: Number(record.endBalance.$text),
      });
    });

    xml.on('end', () => {
      this.subject.complete();
    });

    xml.on('error', (err: Error) => {
      this.subject.error(err);
    });

    return this.subject;
  }
}
