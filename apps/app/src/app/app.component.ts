import { Component } from '@angular/core';
import { ValidationResponse } from '@statement-validator/models';

@Component({
  selector: 'statement-validator-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Statement Validator';
  validationResponse: ValidationResponse | null = null;
}
