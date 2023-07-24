import { Component, Input } from '@angular/core';

@Component({
  selector: 'statement-validator-reference-duplication-failure-component',
  templateUrl: './reference-duplication-failure-component.component.html',
  styleUrls: ['./reference-duplication-failure-component.component.css'],
})
export class ReferenceDuplicationFailureComponentComponent {
  @Input() duplicateReferences: [string, number][] = [];
}
