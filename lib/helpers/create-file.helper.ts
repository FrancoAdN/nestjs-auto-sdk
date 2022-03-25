import * as fs from 'fs';
import { ROOT_DIR } from '../constants';
import { FileReference } from '../interfaces/file-reference.interface';
import { camelToSnakeCase } from './util.helper';

function createDirectory(filePath: string) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
}

export function CreateFile(
  filename: string,
  content: any,
  folder: string,
): string {
  const pathOfFile = `${ROOT_DIR}/${folder}`;
  const fileToCreate = `${pathOfFile}/${filename}`;

  createDirectory(pathOfFile);
  fs.writeFileSync(fileToCreate, content);

  return fileToCreate;
}

export function exportStaticFiles() {
  createDirectory(`${ROOT_DIR}`);
  createDirectory(`${ROOT_DIR}/services`);
  const STATIC_DIR = 'lib/static-services';
  fs.readdirSync(STATIC_DIR).forEach((file) => {
    fs.copyFileSync(`${STATIC_DIR}/${file}`, `${ROOT_DIR}/services/${file}`);
  });
}

export function FindPathThroughReference(reference: string): FileReference {
  const typeName = reference.split('/')[2];
  const filename = `${camelToSnakeCase(typeName)}.interface.ts`;
  const expectedFilePath = `${ROOT_DIR}/interfaces/${filename}`;
  if (!fs.existsSync(expectedFilePath))
    throw new Error(`File with path: ${expectedFilePath} does not exist`);

  return {
    path: expectedFilePath,
    reference: typeName,
  };
}
