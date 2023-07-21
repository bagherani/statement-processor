import { TransactionRecordCallback } from '../types/record-types';

export abstract class TransactionReader {
  abstract read(filename: string, callback: TransactionRecordCallback): void;
}
