import type { TransactionRecord } from '@statement-validator/models';

export function recordValidator({
  startBalance,
  endBalance,
  mutation,
}: TransactionRecord): boolean {
  if ((startBalance + mutation).toFixed(2) !== endBalance.toFixed(2)) {
    return false;
  }

  return true;
}
