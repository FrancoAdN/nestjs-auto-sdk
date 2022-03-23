import * as fs from 'fs';
import { ROOT_DIR } from '../constants';

function createDirectory(filePath: string) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
}

export function CreateFile(filename: string, content: any, folder: string) {
  createDirectory(`${ROOT_DIR}/${folder}`);
  fs.writeFileSync(`${ROOT_DIR}/${folder}/${filename}`, content);
}

export function exportStaticFiles() {
  createDirectory(`${ROOT_DIR}`);
  createDirectory(`${ROOT_DIR}/services`);
  const STATIC_DIR = 'lib/static-services';
  fs.readdirSync(STATIC_DIR).forEach((file) => {
    fs.copyFileSync(`${STATIC_DIR}/${file}`, `${ROOT_DIR}/services/${file}`);
  });
}
