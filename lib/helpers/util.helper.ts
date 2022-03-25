import { ROOT_DIR } from '../constants';

export const firstLetterUppercase = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).substring(1);

export const replaceRootDir = (path: string): string =>
  path.replace(ROOT_DIR, '..');

export const replaceFileExtension = (path: string): string =>
  path.replace('.ts', '');
