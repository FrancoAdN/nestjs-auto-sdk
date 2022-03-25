import { camelToSnakeCase, CreateFile, firstLetterUppercase } from '../helpers';

export class CreateEnumService {
  constructor() {}

  createOne(properties: string[], name: string): string {
    const props = properties.map(
      (prop) => `${firstLetterUppercase(prop)} = '${prop}',`,
    );
    const content = `
    export enum ${name} {
      ${props.join('\n')}
    }
    `;

    return CreateFile(`${camelToSnakeCase(name)}.enum.ts`, content, 'enum');
  }
}
