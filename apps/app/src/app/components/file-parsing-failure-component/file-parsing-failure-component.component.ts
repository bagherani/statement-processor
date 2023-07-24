import { Component, Input } from '@angular/core';

@Component({
  selector: 'statement-validator-file-parsing-failure-component',
  templateUrl: './file-parsing-failure-component.component.html',
  styleUrls: ['./file-parsing-failure-component.component.css'],
})
export class FileParsingFailureComponentComponent {
  @Input() fileErrors: string[] = [];
}
