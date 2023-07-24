import { Component, Input } from '@angular/core';
import {
  InvalidRecordType,
  ValidationResponse,
} from '../../../types/validation-response';

@Component({
  selector: 'statement-validator-result-view',
  templateUrl: './result.view.component.html',
  styleUrls: ['./result.view.component.css'],
})
export class ResultViewComponent {
  @Input() set validationResponse(res: ValidationResponse | null) {
    this.response = res;
    this.showValidationErrors = this.hasValidationError();
    this.showSuccessMessage = this.isValid();
    this.duplicateReferences = this.getDuplicateReferences();
    this.hasDuplicatedReferences = this.getHasDuplicatedReferences();
    this.hasInvalidRecords = this.getHasInvalidRecords();
    this.invalidRecords = this.getInvalidRecords();
    this.hasFileError = this.getHasFileError();
    this.fileErrors = this.getFileErrors();
  }

  private response: ValidationResponse | null = null;
  showValidationErrors = false;
  showSuccessMessage = false;
  hasDuplicatedReferences = false;
  hasInvalidRecords = false;
  hasFileError = false;
  fileErrors: string[] = [];
  invalidRecords: InvalidRecordType = [];
  duplicateReferences: [string, number][] = [];

  validated(): boolean {
    return this.response !== null;
  }

  private isValid(): boolean {
    if (this.response !== null && this.response.errors.length === 0) {
      return (
        Object.keys(this.response.duplicatedReferences).length === 0 &&
        Object.keys(this.response.invalidRecords).length === 0
      );
    }

    return false;
  }

  private hasValidationError(): boolean {
    if (this.response !== null) {
      return (
        Object.keys(this.response.duplicatedReferences).length > 0 ||
        Object.keys(this.response.invalidRecords).length > 0
      );
    }

    return false;
  }

  private getHasFileError(): boolean {
    return (
      this.response !== null &&
      Array.isArray(this.response.errors) &&
      this.response.errors.length > 0
    );
  }

  private getFileErrors(): string[] {
    if (!this.response) {
      return [];
    }

    return this.response.errors;
  }

  private getHasDuplicatedReferences(): boolean {
    if (!this.response) {
      return false;
    }

    return Object.keys(this.response.duplicatedReferences).length > 0;
  }

  private getDuplicateReferences(): [string, number][] {
    if (!this.response) {
      return [];
    }

    return Object.entries(this.response.duplicatedReferences);
  }

  private getHasInvalidRecords(): boolean {
    if (!this.response) {
      return false;
    }

    return Object.keys(this.response?.invalidRecords).length > 0;
  }

  private getInvalidRecords(): InvalidRecordType {
    if (!this.response) {
      return [];
    }

    return Object.entries(this.response.invalidRecords).map(([key, value]) => ({
      reference: key,
      expectedBalance: value.startBalance + value.mutation,
      startBalance: value.startBalance,
      mutation: value.mutation,
      endBalance: value.endBalance,
    }));
  }
}
