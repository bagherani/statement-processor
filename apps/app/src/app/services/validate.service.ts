import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { ValidationResponse } from '@statement-validator/models';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor(private http: HttpClient) {}

  validate(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<ValidationResponse>(
      `${environment.apiEndpoint}/validate`,
      formData
    );
  }
}
