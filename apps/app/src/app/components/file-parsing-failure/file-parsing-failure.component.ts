import { Component, Input } from '@angular/core';

@Component({
  selector: 'statement-validator-file-parsing-failure',
  templateUrl: './file-parsing-failure.component.html',
  styleUrls: ['./file-parsing-failure.component.css'],
})
export class FileParsingFailureComponent {
  @Input() fileErrors: string[] = [];
}
