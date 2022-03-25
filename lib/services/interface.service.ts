import {
  CreateFile,
  FindPathThroughReference,
  firstLetterUppercase,
  replaceRootDir,
} from '../helpers';
import { FileReference } from '../interfaces/file-reference.interface';
import { CreateEnumService } from './enum.service';

export class CreateInterfaceService {
  private static instance = false;
  private constructor(private readonly enumService: CreateEnumService) {}

  static newInstance() {
    if (!this.instance) {
      this.instance = true;
      return new CreateInterfaceService(new CreateEnumService());
    }
  }

  private createOne(name: string, schema: object) {
    const imports: string[] = [];

    const properties: string = Object.keys(schema['properties'])
      .map((prop) => {
        const propType = schema['properties'][prop]['type'];
        const arrayAttr: string = Boolean(schema['properties'][prop]['isArray'])
          ? '[]'
          : '';
        if (typeof propType === 'object') {
          const foundFile: FileReference = FindPathThroughReference(
            propType['$ref'],
          );
          imports.push(
            `import { ${foundFile.reference} } from '${replaceRootDir(
              foundFile.path,
            ).replace('.ts', '')}'`,
          );

          return `${prop}: ${foundFile.reference}${arrayAttr};`;
        }

        if (propType === 'enum') {
          const enumName = `${name}${firstLetterUppercase(prop)}Enum`;
          const pathToEnum = this.enumService.createOne(
            schema['properties'][prop]['enum'],
            enumName,
          );
          imports.push(
            `import { ${enumName} } from '${replaceRootDir(pathToEnum).replace(
              '.ts',
              '',
            )}'`,
          );
          return `${prop}: ${enumName}${arrayAttr};`;
        }

        return `${prop}: ${propType}${arrayAttr};`;
      })
      .join('\n');

    const filename = `${name.toLowerCase()}.interface.ts`;
    const content = `
      ${imports.join('\n')}
      export interface ${name}{
        ${properties}
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
