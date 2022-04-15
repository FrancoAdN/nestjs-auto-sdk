import { MetadataSchema } from '../temp/metadata-schema';
import { pick, isEmpty } from 'lodash';

interface SdkClientOptions {
  clientName: string;
}

export function SdkClient(options: SdkClientOptions): ClassDecorator {
  return (target) => {
    const controllerName = target.name;
    const basePath = Reflect.getMetadata('path', target) || '';
    let clients = Reflect.getMetadata('clients', MetadataSchema);
    const existingMetadata = pick(clients, controllerName);

    if (existingMetadata) {
      existingMetadata[options.clientName] = existingMetadata[controllerName];
      delete existingMetadata[controllerName];
      delete clients[controllerName];
      if (!isEmpty(basePath) && basePath !== '/') {
        //MOVE THIS TO A HELPER
        Object.keys(existingMetadata[options.clientName]).forEach((k) => {
          let endpoint = existingMetadata[options.clientName][k]['endpoint'];
          if (endpoint !== '/') {
            endpoint = `${basePath}/${endpoint}`;
          } else endpoint = `${basePath}/`;
          existingMetadata[options.clientName][k]['endpoint'] = endpoint;
        });
      }
      clients = {
        ...existingMetadata,
        ...clients,
      };

      Reflect.defineMetadata('clients', clients, MetadataSchema);
    }
  };
}
