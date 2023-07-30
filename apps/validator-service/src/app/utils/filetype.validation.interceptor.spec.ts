import { HttpException, HttpStatus } from '@nestjs/common';
import { File } from '@statement-validator/models';
import { fileTypeValidationInterceptor } from './filetype.validation.interceptor';

describe('fileValidations', () => {
  const mockCb = jest.fn();

  beforeEach(() => {
    mockCb.mockReset();
  });

  it('should call the callback with true for valid file types', () => {
    const mockFile = {
      mimetype: 'text/xml',
    } as File;

    fileTypeValidationInterceptor.fileFilter(null, mockFile, mockCb);

    expect(mockCb).toHaveBeenCalledTimes(1);
    expect(mockCb).toHaveBeenCalledWith(null, true);
  });

  it('should call the callback with false for invalid file types', () => {
    const mockFile = {
      mimetype: 'image/jpeg',
    } as File;

    fileTypeValidationInterceptor.fileFilter(null, mockFile, mockCb);

    expect(mockCb).toHaveBeenCalledTimes(1);
    expect(mockCb).toHaveBeenCalledWith(
      new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST),
      false
    );
  });
});
