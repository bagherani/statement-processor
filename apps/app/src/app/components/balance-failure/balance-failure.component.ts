import { Component, Input } from '@angular/core';
import { InvalidRecordType } from '@statement-validator/models';

@Component({
  selector: 'statement-validator-balance-failure',
  templateUrl: './balance-failure.component.html',
  styleUrls: ['./balance-failure.component.css'],
})
export class BalanceFailureComponent {
  @Input() invalidRecords: InvalidRecordType = [];
}
