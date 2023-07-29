import { TransactionRecordCallback } from '../types/record-types';
import { File } from '@statement-validator/models';

export abstract class TransactionReader {
  abstract read(file: File, callback: TransactionRecordCallback): void;
}
