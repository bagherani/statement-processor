import { File } from '@statement-validator/models';
import { TransactionRecord } from '@statement-validator/models';
import { recordValidator } from '@statement-validator/record-validator';
import { Observable } from 'rxjs/internal/Observable';

import { TransactionReader } from './transaction.reader';
import {
  TransactionReaderFactory,
  TransactionsFileType,
} from './transaction.reader.factory';
import {
  DuplicatedReferences,
  InvalidRecords,
  ValidationResponse,
} from '@statement-validator/models';
import { Subject } from 'rxjs/internal/Subject';
import { InvalidRecord } from '../types/record-types';

export class TransactionValidator {
  private readonly reader: TransactionReader;
  private readonly duplicateRefs: Map<number, number>;
  private readonly invalidRecords: Map<number, InvalidRecord>;
  private readonly errors: Error[] = [];
  private readonly resultSubject: Subject<ValidationResponse>;

  constructor(fileType: TransactionsFileType) {
    this.reader = TransactionReaderFactory.create(fileType);
    this.duplicateRefs = new Map<number, number>();
    this.invalidRecords = new Map<number, InvalidRecord>();
    this.resultSubject = new Subject();
  }

  validate(file: File): Observable<ValidationResponse> {
    this.duplicateRefs.clear();
    this.invalidRecords.clear();
    this.errors.splice(0, this.errors.length);

    this.reader.read(file).subscribe({
      next: (record: TransactionRecord) => {
        this.checkForDuplication(record);
        this.checkEndBalance(record);
      },
      error: (err) => {
        this.errors.push(err);
        this.sendResult();
      },
      complete: this.sendResult,
    });

    return this.resultSubject;
  }

  private sendResult = () => {
    const result: ValidationResponse = {
      duplicatedReferences: this.getDuplicateRefs(),
      invalidRecords: this.getInvalidRefs(),
      errors: this.getErrors(),
    };

    this.resultSubject.next(result);
    this.resultSubject.complete();
  };

  private checkEndBalance = ({
    startBalance,
    endBalance,
    mutation,
    reference,
  }) => {
    if (!recordValidator({ startBalance, endBalance, mutation, reference })) {
      this.invalidRecords.set(reference, {
        startBalance,
        mutation,
        endBalance,
      });
    }
  };

  private checkForDuplication = ({ reference }: TransactionRecord) => {
    this.duplicateRefs.set(
      reference,
      this.duplicateRefs.has(reference)
        ? this.duplicateRefs.get(reference) + 1
        : 1
    );
  };

  private getDuplicateRefs = (): DuplicatedReferences => {
    const result = {};
    this.duplicateRefs.forEach((value, key) => {
      if (value > 1) {
        result[key] = value;
      }
    });

    return result;
  };

  private getInvalidRefs = (): InvalidRecords => {
    const result = {};

    this.invalidRecords.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  };

  private getErrors = (): string[] => {
    return this.errors.map((err) => err.message);
  };
}
