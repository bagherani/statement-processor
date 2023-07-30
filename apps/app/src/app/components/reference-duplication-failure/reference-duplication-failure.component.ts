import { Component, Input } from '@angular/core';

@Component({
  selector: 'statement-validator-reference-duplication-failure',
  templateUrl: './reference-duplication-failure.component.html',
  styleUrls: ['./reference-duplication-failure.component.css'],
})
export class ReferenceDuplicationFailureComponent {
  @Input() duplicateReferences: [string, number][] = [];
}
