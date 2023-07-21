import { EventEmitter } from 'events';

import { TransactionRecord } from '../types/record-types';
import { TransactionReader } from './transaction.reader';
import {
  TransactionReaderFactory,
  TransactionsFileType
} from './transaction.reader.factory';

type InvalidRecord = {
  startBalance: number;
  mutation: number;
  endBalance: number;
};

export class TransactionValidator extends EventEmitter {
  private readonly reader: TransactionReader;
  private readonly duplicateRefs: Map<number, number>;
  private readonly invalidRecords: Map<number, InvalidRecord>;

  constructor(fileType: TransactionsFileType) {
    super();
    this.reader = TransactionReaderFactory.create(fileType);
    this.duplicateRefs = new Map<number, number>();
    this.invalidRecords = new Map<number, InvalidRecord>();
  }

  validate(filename: string) {
    this.duplicateRefs.clear();
    this.invalidRecords.clear();
    this.reader.read(filename, this.validateRecord);

    return this;
  }

  private validateRecord = (err: Error, record: TransactionRecord) => {
    if (record === null && err === null) {
      this.emit('done', {
        duplicatedReferences: this.getDuplicateRefs(),
        invalidRecords: this.getInvalidRefs()
      });

      return;
    }

    this.checkForDuplication(err, record);
    this.checkEndBalance(err, record);
  };

  private checkEndBalance = (err: Error, record: TransactionRecord) => {
    const startBalance = record.startBalance;
    const mutation = record.mutation;
    const endBalance = record.endBalance;

    if ((startBalance + mutation).toFixed(2) !== endBalance.toFixed(2)) {
      this.invalidRecords.set(record.reference, {
        startBalance,
        mutation,
        endBalance
      });
    }
  };

  private checkForDuplication = (err: Error, record: TransactionRecord) => {
    const reference = record.reference;

    this.duplicateRefs.set(
      reference,
      this.duplicateRefs.has(reference)
        ? this.duplicateRefs.get(reference) + 1
        : 1
    );
  };

  private getDuplicateRefs = () => {
    const result = {};
    this.duplicateRefs.forEach((value, key) => {
      if (value > 1) {
        result[key] = value;
      }
    });

    return result;
  };

  private getInvalidRefs = () => {
    const result = {};

    this.invalidRecords.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  };
}
