import { TransactionRecordCallback } from '../types/record-types';

export abstract class TransactionReader {
  abstract read(
    file: Express.Multer.File,
    callback: TransactionRecordCallback
  ): void;
}
