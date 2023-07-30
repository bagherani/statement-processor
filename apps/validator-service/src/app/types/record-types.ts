import { TransactionRecord } from '@statement-validator/models';

export type RawTransactionRecord = {
  $: {
    reference: number;
  };
  mutation: { $text: string };
  startBalance: { $text: string };
  endBalance: { $text: string };
};

export type TransactionRecordCallback = (
  err: Error,
  res: TransactionRecord
) => void;

export type CsvRecordType = {
  Reference: number;
  Mutation: number;
  'Start Balance': string;
  'End Balance': number;
};

export type InvalidRecord = {
  startBalance: number;
  mutation: number;
  endBalance: number;
};
