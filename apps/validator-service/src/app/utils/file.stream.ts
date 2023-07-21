import { ReadStream, createReadStream } from 'fs';

export function getFileStream(
  absFilePath: string,
  options: { encoding: BufferEncoding } | null = { encoding: 'utf8' }
): ReadStream {
  return createReadStream(absFilePath, options);
}
