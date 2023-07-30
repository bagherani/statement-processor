import { Observable } from 'rxjs/internal/Observable';
import { File, TransactionRecord } from '@statement-validator/models';

export abstract class TransactionReader {
  abstract read(file: File): Observable<TransactionRecord>;
}
