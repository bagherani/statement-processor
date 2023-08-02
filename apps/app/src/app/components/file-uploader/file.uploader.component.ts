import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationResponse } from '@statement-validator/models';
import { ValidateService } from '../../services/validate.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'statement-validator-file-uploader',
  templateUrl: './file.uploader.component.html',
  styleUrls: ['./file.uploader.component.css'],
})
export class FileUploaderComponent {
  selectedFile: File | null = null;
  errorMessage = '';
  loading = false;

  @Input() result: ValidationResponse | null = null;
  @Output() resultChange = new EventEmitter<ValidationResponse | null>();

  constructor(private service: ValidateService) {}

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.errorMessage = '';

    if (!target || !target.files?.length) {
      this.selectedFile = null;
      this.resultChange.emit(null);

      return;
    }

    if (target.files) {
      this.selectedFile = target.files[0];
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    if (!this.selectedFile) {
      return;
    }

    this.loading = true;

    this.service.validate(this.selectedFile).subscribe({
      next: (result) => {
        this.resultChange.emit(result);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.loading = false;
      },
      complete: () => {
        this.errorMessage = '';
        this.loading = false;
      },
    });
  }
}
