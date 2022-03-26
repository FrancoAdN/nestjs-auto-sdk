import {
  camelToSnakeCase,
  CreateFile,
  FindPathThroughReference,
  replaceRootDir,
} from '../helpers';

export class ClientService {
  private static instance = false;
  private constructor() {}

  static newInstance(): ClientService {
    if (!this.instance) {
      this.instance = true;
      return new ClientService();
    }
  }

  private createOne(name: string, schema: object) {
    const imports: string[] = [
      `import { RequestService, RequestOptions } from '../services';`,
    ];

    const methods: string[] = Object.keys(schema).map((method) => {
      const endpoint = `${schema[method]['endpoint']}`;
      let options: string;

      let returnType: string;

      if (schema[method]['returns']['type'] !== 'object')
        returnType = schema[method]['returns']['type'];
      else {
        const { path, reference } = FindPathThroughReference(
          schema[method]['returns']['$ref'],
        );
        const importLine = `import { ${reference} } from '${replaceRootDir(
          path,
        ).replace('.ts', '')}';`;
        returnType = reference;
        if (!imports.includes(importLine)) imports.push(importLine);
      }

      if (Boolean(schema[method]['returns']['isArray'])) returnType += '[]';

      const methodParams: string[] = [];
      if (schema[method]['param']) {
        methodParams.push(
          `${schema[method]['param']['propName']}:${schema[method]['param']['propType']}`,
        );
        options = `param: ${schema[method]['param']['propName']}`;
      }

      return `
      async ${method}(${methodParams.join(
        ', ',
      )}, headers?: object): Promise<${returnType}> {
        const options = {
          ${options}
        }
        
        
        ${
          returnType === 'void' ? '' : 'const response = '
        } await this.client.${schema[method]['httpVerb'].toLowerCase()}(
          '${endpoint}',
          options,
          headers
        );
        ${returnType === 'void' ? '' : 'return response.data;'} 
      }
      `;
    });
    const content = `
    ${imports.join('\n')}
    export class ${name} {

      static newInstance(options: any) {
        return new ConversationClient(
          RequestService.newInstance(options.baseUrl, options.defaultHeaders),
        );
      }

      private constructor(
        private readonly client: RequestService,
      ) {}
    
      ${methods.join('\n')}
    }
    `;

    const filename = `${camelToSnakeCase(name)}.client.ts`;
    CreateFile(filename, content, 'clients');
  }

  createMultiple(source: object) {
    Object.keys(source).forEach((key) => this.createOne(key, source[key]));
  }
}
