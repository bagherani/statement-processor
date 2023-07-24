import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { ValidationResponse } from '../../../types/validation-response';

@Component({
  selector: 'statement-validator-file-uploader',
  templateUrl: './file.uploader.component.html',
  styleUrls: ['./file.uploader.component.css'],
})
export class FileUploaderComponent {
  selectedFile: File | null = null;
  @Output() validationResultEvent = new EventEmitter<ValidationResponse>();

  constructor(private http: HttpClient) {}

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target || !target.files?.length) {
      this.selectedFile = null;
      return;
    }

    if (target.files) {
      this.selectedFile = target.files[0];
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post(`${environment.apiEndpoint}/validate`, formData).subscribe(
        (response) => {
          const result = response as ValidationResponse;
          this.validationResultEvent.emit(result);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
