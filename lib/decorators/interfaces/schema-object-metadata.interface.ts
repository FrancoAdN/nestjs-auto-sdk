import { Type } from '@nestjs/common';

export interface SchemaObjectMetadata {
  type?: Type<unknown> | Function | [Function] | string | Record<string, any>;
  isArray?: boolean;
  required?: boolean;
  name?: string;
  enumName?: string;
}
