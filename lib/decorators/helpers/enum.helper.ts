import { isString } from 'lodash';
// import { SchemaObject } from '../interfaces/open-api-spec.interface';
// import { SchemaObjectMetadata } from '../interfaces/schema-object-metadata.interface';
// import { SwaggerEnumType } from '../types/swagger-enum.type';

export type SwaggerEnumType =
  | string[]
  | number[]
  | (string | number)[]
  | Record<number, string>;

export function getEnumValues(enumType: SwaggerEnumType): string[] | number[] {
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

export function getEnumType(values: (string | number)[]): 'string' | 'number' {
  const hasString = values.filter(isString).length > 0;
  return hasString ? 'string' : 'number';
}
