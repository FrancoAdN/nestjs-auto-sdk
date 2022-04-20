// import { DECORATORS } from './decorators.constants';
// import {
//   createPropertyDecorator,
//   getEnumType,
//   getEnumValues,
//   getTypeIsArrayTuple,
// } from './helpers';
// import { SchemaObjectMetadata } from './interfaces';

import { MetadataSchema } from '../temp/metadata-schema';

export function getEnumValues(enumType: any): string[] | number[] {
  if (Array.isArray(enumType)) {
    return enumType as string[];
  }
  if (typeof enumType !== 'object') {
    return [];
  }

  const values = [];
  const uniqueValues = {};

  for (const key in enumType) {
    const value = enumType[key];
    // filter out cases where enum key also becomes its value (A: B, B: A)
    if (
      !uniqueValues.hasOwnProperty(value) &&
      !uniqueValues.hasOwnProperty(key)
    ) {
      values.push(value);
      uniqueValues[value] = value;
    }
  }
  return values;
}

export interface SdkPropertyOptions {
  type?: string;
  required?: boolean;
  enum?: any;
}

export function SdkProperty(options?: SdkPropertyOptions): PropertyDecorator {
  if (options && options.enum) {
    const values = getEnumValues(options.enum);
    console.log(values, options.enum.name);
  }

  return (target: object, propertyKey: string) => {
    const className = target.constructor.name;
    const extendedClass = Object.getPrototypeOf(target.constructor).name;
    const propType: string = Reflect.getMetadata(
      'design:type',
      target,
      propertyKey,
    ).name;

    let type: any = {
      required: options ? options.required || false : false,
    };

    if (propType !== Array.name) {
      type = {
        ...type,
        type: propType.toLowerCase(),
      };
    } else {
      type = {
        ...type,
        type: options
          ? `${options.type.toLowerCase() || 'undefined'}[]`
          : 'undefined[]',
      };
    }

    const previousMetadata = Reflect.getMetadata('types', MetadataSchema);

    const metadataToSave = { ...previousMetadata };
    //console.log(propertyKey, typeof propertyKey);

    if (previousMetadata && previousMetadata[className])
      metadataToSave[className][propertyKey] = type;
    else {
      metadataToSave[className] = {};
      if (extendedClass)
        metadataToSave[className]['#classExtendsFrom'] = extendedClass;
      metadataToSave[className][propertyKey] = type;
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
