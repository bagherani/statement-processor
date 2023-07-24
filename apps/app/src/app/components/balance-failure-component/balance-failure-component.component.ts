import { Component, Input } from '@angular/core';

import { InvalidRecordType } from '../../../types/validation-response';

@Component({
  selector: 'statement-validator-balance-failure-component',
  templateUrl: './balance-failure-component.component.html',
  styleUrls: ['./balance-failure-component.component.css'],
})
export class BalanceFailureComponentComponent {
  @Input() invalidRecords: InvalidRecordType = [];
}
