import { CreateFile } from '../helpers';

export class CreateInterfaceService {
  private static instance = false;
  private constructor() {}

  static newInstance() {
    if (!this.instance) {
      this.instance = true;
      return new CreateInterfaceService();
    }
  }

  private createOne(name: string, schema: object) {
    let props: string = '';
    let imports: string = '';

    for (let key of Object.keys(schema['properties'])) {
      props += `
      ${key}: ${schema['properties'][key]['type']};
      `;
    }

    const filename = `${name.toLowerCase()}.interface.ts`;
    const content = `
      ${imports}
      export interface ${name}{
        ${props}
      }
    `;

    CreateFile(filename, content, 'interfaces');
  }

  createMultiple(source: object) {
    for (let key of Object.keys(source)) {
      this.createOne(key, source[key]);
    }
  }
}
