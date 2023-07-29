import { getFileStream } from './file.stream';
import { Readable } from 'stream';
import { File } from '@statement-validator/models';

describe('getFileStream', () => {
  it('should return a readable stream with file buffer', () => {
    const mockFile: File = {
      fieldname: 'file',
      stream: null,
      originalname: 'test.xml',
      encoding: '7bit',
      mimetype: 'text/xml',
      destination: '/path/to/destination',
      filename: 'abc123.xml',
      path: '/path/to/destination/abc123.xml',
      size: 1024,
      buffer: Buffer.from('<xml>Test content</xml>'),
    };

    const result = getFileStream(mockFile);

    expect(result).toBeInstanceOf(Readable);
    expect(result.read().toString()).toBe('<xml>Test content</xml>');
    expect(result.read()).toBeNull();
  });
});
