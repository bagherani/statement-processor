import { Readable } from 'stream';

export function getFileStream(file: Express.Multer.File): Readable {
  const stream = new Readable();
  stream.push(file.buffer);
  stream.push(null);
  return stream;
}
