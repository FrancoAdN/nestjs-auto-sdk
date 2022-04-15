// import { DECORATORS } from './decorators.constants';
// import {
//   createPropertyDecorator,
//   getEnumType,
//   getEnumValues,
//   getTypeIsArrayTuple,
// } from './helpers';
// import { SchemaObjectMetadata } from './interfaces';

import { MetadataSchema } from '../temp/metadata-schema';

export interface ApiPropertyOptions {
  // extends Omit<SchemaObjectMetadata, 'name' | 'enum'> {
  // name?: string;
  // enum?: any[] | Record<string, any>;
  // enumName?: string;
  // items?: any;
  type: string;
  required?: boolean;
}

export function SdkProperty(options: ApiPropertyOptions): PropertyDecorator {
  return (target: object, propertyKey: string) => {
    const className = target.constructor.name;
    const extendedClass = Object.getPrototypeOf(target.constructor).name;

    const previousMetadata = Reflect.getMetadata('types', MetadataSchema);

    const metadataToSave = { ...previousMetadata };

    if (previousMetadata && previousMetadata[className])
      metadataToSave[className][propertyKey] = options.type;
    else {
      metadataToSave[className] = {};
      if (extendedClass)
        metadataToSave[className]['#classExtendsFrom'] = extendedClass;
      metadataToSave[className][propertyKey] = options.type;
    }
    Reflect.defineMetadata('types', metadataToSave, MetadataSchema);
  };
}

// const isEnumArray = (obj: ApiPropertyOptions): boolean =>
//   obj.isArray && !!obj.enum;

// export function createSdkPropertyDecorator(
//   options: ApiPropertyOptions = {},
//   overrideExisting = true,
// ): PropertyDecorator {
//   const [type, isArray] = getTypeIsArrayTuple(options.type, options.isArray);
//   options = {
//     ...options,
//     type,
//     isArray,
//   };

//   if (isEnumArray(options)) {
//     options.type = 'array';

//     const enumValues = getEnumValues(options.enum);
//     options.items = {
//       type: getEnumType(enumValues),
//       enum: enumValues,
//     };
//     delete options.enum;
//   } else if (options.enum) {
//     const enumValues = getEnumValues(options.enum);

//     options.enum = enumValues;
//     options.type = getEnumType(enumValues);
//   }

//   if (Array.isArray(options.type)) {
//     options.type = 'array';
//     options.items = {
//       type: 'array',
//       items: {
//         type: options.type[0],
//       },
//     };
//   }

//   return createPropertyDecorator(
//     DECORATORS.SDK_MODEL_PROPERTIES,
//     options,
//     overrideExisting,
//   );
// }
