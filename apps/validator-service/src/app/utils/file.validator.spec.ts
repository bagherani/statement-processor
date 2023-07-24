import { HttpException, HttpStatus } from '@nestjs/common';

import { fileValidations } from './file.validator';

describe('fileValidations', () => {
  const mockCb = jest.fn();

  beforeEach(() => {
    mockCb.mockReset();
  });

  it('should call the callback with true for valid file types', () => {
    const mockFile = {
      mimetype: 'text/xml',
    } as Express.Multer.File;

    fileValidations.fileFilter(null, mockFile, mockCb);

    expect(mockCb).toHaveBeenCalledTimes(1);
    expect(mockCb).toHaveBeenCalledWith(null, true);
  });

  it('should call the callback with false for invalid file types', () => {
    const mockFile = {
      mimetype: 'image/jpeg',
    } as Express.Multer.File;

    fileValidations.fileFilter(null, mockFile, mockCb);

    expect(mockCb).toHaveBeenCalledTimes(1);
    expect(mockCb).toHaveBeenCalledWith(
      new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST),
      false
    );
  });
});
