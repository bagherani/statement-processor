import { Component, Input } from '@angular/core';
import {
  InvalidRecords,
  ValidationResponse,
} from '../../../types/validation-response';

@Component({
  selector: 'statement-validator-result-view',
  templateUrl: './result.view.component.html',
  styleUrls: ['./result.view.component.css'],
})
export class ResultViewComponent {
  @Input() validationResponse: ValidationResponse | null;

  constructor() {
    this.validationResponse = null;
  }

  validated(): boolean {
    return this.validationResponse !== null;
  }

  showSuccessMessage(): boolean {
    if (
      this.validationResponse !== null &&
      this.validationResponse.errors.length === 0
    ) {
      return (
        Object.keys(this.validationResponse.duplicatedReferences).length ===
          0 && Object.keys(this.validationResponse.invalidRecords).length === 0
      );
    }

    return false;
  }

  showErrors(): boolean {
    if (this.validationResponse !== null) {
      return (
        Object.keys(this.validationResponse.duplicatedReferences).length > 0 ||
        Object.keys(this.validationResponse.invalidRecords).length > 0
      );
    }

    return false;
  }

  hasFileError(): boolean {
    return (
      this.validationResponse !== null &&
      Array.isArray(this.validationResponse.errors) &&
      this.validationResponse.errors.length > 0
    );
  }

  getFileErrors(): string[] {
    if (!this.validationResponse) {
      return [];
    }

    return this.validationResponse.errors;
  }

  hasDuplicatedReferences(): boolean {
    if (!this.validationResponse) {
      return false;
    }

    return Object.keys(this.validationResponse.duplicatedReferences).length > 0;
  }

  getDuplicateReferences(): [string, number][] {
    if (!this.validationResponse) {
      return [];
    }

    return Object.entries(this.validationResponse.duplicatedReferences);
  }

  hasInvalidRecords(): boolean {
    if (!this.validationResponse) {
      return false;
    }

    return Object.keys(this.validationResponse?.invalidRecords).length > 0;
  }

  getInvalidRecords(): (InvalidRecords[number] & {
    reference: string;
    expectedBalance: number;
  })[] {
    if (!this.validationResponse) {
      return [];
    }

    return Object.entries(this.validationResponse.invalidRecords).map(
      ([key, value]) => ({
        reference: key,
        expectedBalance: value.startBalance + value.mutation,
        startBalance: value.startBalance,
        mutation: value.mutation,
        endBalance: value.endBalance,
      })
    );
  }
}
