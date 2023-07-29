import { recordValidator } from './record-validator';
import type { TransactionRecord } from '@statement-validator/models';

const records: (TransactionRecord & { correct: boolean })[] = [
  {
    startBalance: 10,
    endBalance: 20,
    mutation: 10,
    reference: 1,
    correct: true,
  },
  {
    startBalance: 0,
    endBalance: 20,
    mutation: 0,
    reference: 2,
    correct: false,
  },
  {
    startBalance: 10.123,
    endBalance: 4.8,
    mutation: -5.321,
    reference: 3,
    correct: true,
  },
];

describe('recordValidator function', () => {
  it.each(records)(
    'validate record refId: $reference',
    ({ startBalance, endBalance, mutation, reference, correct }) => {
      expect(
        recordValidator({
          startBalance,
          endBalance,
          mutation,
          reference,
        })
      ).toEqual(correct);
    }
  );
});
