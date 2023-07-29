import { Readable } from 'stream';
import { File } from '@statement-validator/models';

export function getFileStream(file: File): Readable {
  const stream = new Readable();
  stream.push(file.buffer);
  stream.push(null);
  return stream;
}
