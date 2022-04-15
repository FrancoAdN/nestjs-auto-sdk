import { RequestMethod } from '@nestjs/common';
import { MetadataSchema } from '../temp/metadata-schema';

function getHttpMethod(method: Function): string {
  const METADATAKEY = 'method';
  const methodNumber = Reflect.getMetadata(METADATAKEY, method);
  if (methodNumber > -1) {
    const indexOfEnum = Object.values(RequestMethod).indexOf(
      methodNumber as unknown as RequestMethod,
    );
    return Object.keys(RequestMethod)[indexOfEnum];
  }
}

function getHttpPath(method: Function): string {
  const METADATAKEY = 'path';
  return Reflect.getMetadata(METADATAKEY, method);
}

function getPathParms(path: string) {
  let pathParms: any = {
    hasPathParms: false,
  };
  const params = path.split('/:');
  if (params.length > 1) {
    pathParms = {
      hasPathParms: true,
      propName: params[1].split('/')[0],
      propType: 'string',
    };
  }

  return pathParms;
}

interface ClientMethodOptions {
  sdkMethodName?: string;
  body?: {
    type: any;
    isArray?: boolean;
  };
  response: {
    type: any;
    isArray?: boolean;
  };
  query?: {};
}

export function SdkClientMethod(
  options?: ClientMethodOptions,
): MethodDecorator {
  if (!options) {
    options = {
      response: {
        type: 'void',
        isArray: false,
      },
    };
  } else {
    options.response.type = `#/types/${options.response.type.name}`;
  }

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const className = target.constructor.name;
    const path = getHttpPath(descriptor.value) || '';
    const method = getHttpMethod(descriptor.value) || '';

    const pathParms = getPathParms(path);

    // const paramTypes = Reflect.getMetadata(
    //   'design:paramtypes',
    //   target,
    //   propertyKey,
    // )[0];

    // console.log(Reflect.get(target, paramTypes));

    let clientMethod = {};
    const methodName = options
      ? options.sdkMethodName || propertyKey
      : propertyKey;
    clientMethod[methodName] = {
      endpoint: path,
      httpVerb: method,
      returns: {
        type: options.response.type,
        isArray: options.response.isArray || false,
      },
    };

    if (options.body) {
      // console.log(
      //   'TYPE',
      //   typeof options.body.type.name,
      //   options.body.type.instance,
      // );
      clientMethod[methodName] = {
        ...clientMethod[methodName],
        body: {
          $ref: `#/types/${options.body.type.name}`,
          isArray: options.body.isArray || false,
        },
      };
    }

    if (pathParms.hasPathParms) {
      const { propName, propType } = pathParms;
      clientMethod[methodName] = {
        ...clientMethod[methodName],
        param: {
          propName,
          propType,
        },
      };
    }

    const previousMetadata = Reflect.getMetadata('clients', MetadataSchema);

    const metadataToSave = { ...previousMetadata };

    if (previousMetadata && previousMetadata[className]) {
      metadataToSave[className] = {
        ...metadataToSave[className],
        ...clientMethod,
      };
    } else {
      metadataToSave[className] = clientMethod;
    }

    Reflect.defineMetadata('clients', metadataToSave, MetadataSchema);
  };
}
