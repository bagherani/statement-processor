import XmlStream from 'xml-stream';
import { File } from '@statement-validator/models';

import {
  RawTransactionRecord,
  TransactionRecordCallback,
} from '../../types/record-types';
import { getFileStream } from '../../utils/file.stream';
import { TransactionReader } from '../transaction.reader';

export class XmlTransactionReader extends TransactionReader {
  read(file: File, callback: TransactionRecordCallback): void {
    const fileStream = getFileStream(file);
    const xml = new XmlStream(fileStream);

    xml.preserve('records', true);
    xml.collect('records');

    xml.on('endElement: record', (record: RawTransactionRecord) => {
      callback(null, {
        reference: record.$.reference,
        startBalance: Number(record.startBalance.$text),
        mutation: Number(record.mutation.$text),
        endBalance: Number(record.endBalance.$text),
      });
    });

    xml.on('end', () => {
      callback(null, null);
    });

    xml.on('error', (err: Error) => {
      callback(err, null);
    });
  }
}
