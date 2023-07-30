import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ValidateService } from './validate.service';
import { environment } from '../../environment';
import { ValidationResponse } from '@statement-validator/models';

describe('ValidateServiceService', () => {
  let service: ValidateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ValidateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After each test, verify that there are no outstanding HTTP requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to the API with the file', () => {
    const mockFile = new File(['mock content'], 'mock.csv', {
      type: 'text/csv',
    });

    // Define the expected response from the API
    const mockResponse: ValidationResponse = {
      duplicatedReferences: {},
      invalidRecords: {},
      errors: [],
    };

    service.validate(mockFile).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const apiEndpoint = `${environment.apiEndpoint}/validate`;
    const req = httpMock.expectOne(apiEndpoint);

    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTruthy();
    expect(req.request.body.get('file')).toBe(mockFile);

    req.flush(mockResponse);
  });

  it('should handle API errors', () => {
    const mockFile = new File(['mock content'], 'mock.csv', {
      type: 'text/csv',
    });

    // Define the expected error response from the API
    const mockErrorResponse = { error: 'Validation failed' };

    service.validate(mockFile).subscribe({
      next: () => fail('The request should have failed with an error.'),
      error: (error) => {
        expect(error).toEqual(mockErrorResponse);
      },
    });

    const apiEndpoint = `${environment.apiEndpoint}/validate`;
    const req = httpMock.expectOne(apiEndpoint);

    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
