import XmlStream from 'xml-stream';

import {
  RawTransactionRecord,
  TransactionRecordCallback,
} from '../../types/record-types';
import { getFileStream } from '../../utils/file.stream';
import { TransactionReader } from '../transaction.reader';

export class XmlTransactionReader extends TransactionReader {
  read(filename: string, callback: TransactionRecordCallback): void {
    const fileStream = getFileStream(filename);
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
      fileStream.close();
      callback(null, null);
    });

    xml.on('error', (err) => {
      fileStream.close();
      callback(err, null);
    });
  }
}
