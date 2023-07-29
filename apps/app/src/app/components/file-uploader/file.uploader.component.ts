import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationResponse } from '@statement-validator/models';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'statement-validator-file-uploader',
  templateUrl: './file.uploader.component.html',
  styleUrls: ['./file.uploader.component.css'],
})
export class FileUploaderComponent {
  selectedFile: File | null = null;
  @Input() result: ValidationResponse | null = null;
  @Output() resultChange = new EventEmitter<ValidationResponse | null>();

  constructor(private service: ValidateService) {}

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;

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

    this.service.validate(this.selectedFile).subscribe((result) => {
      this.resultChange.emit(result);
    });
  }
}
