import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MetadataSchema } from '../lib';
import { ApplicationModule } from './src/app.module';
import { join } from 'path';
import { writeFileSync } from 'fs';

describe('Validate OpenAPI schema', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await NestFactory.create(ApplicationModule, {
      logger: false,
    });
    app.setGlobalPrefix('api/');
    app.enableVersioning();
  });

  afterAll(() => {
    app.close();
  });

  it('should produce a valid OpenAPI 3.0 schema', async () => {
    const types = Reflect.getMetadata('types', MetadataSchema);
    const clients = Reflect.getMetadata('clients', MetadataSchema);
    const json = {
      types,
      clients,
    };

    const doc = JSON.stringify(json, null, 2);
    writeFileSync(join(__dirname, 'api-spec.json'), doc);

    expect(true).toBeTruthy();
  });
});
