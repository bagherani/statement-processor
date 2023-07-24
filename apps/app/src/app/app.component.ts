import { Component } from '@angular/core';
import { ValidationResponse } from '../types/validation-response';

@Component({
  selector: 'statement-validator-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Statement Validator';
  validationResponse: ValidationResponse | null;

  constructor() {
    this.validationResponse = null;
  }

  showValidation(resp: ValidationResponse) {
    this.validationResponse = resp;
  }
}
