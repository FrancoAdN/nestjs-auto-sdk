import * as fs from 'fs';
import { exportStaticFiles } from './helpers/create-file.helper';
import { ClientService, CreateInterfaceService } from './services';

function handleErrors(err) {
  console.error(err);
  process.exit(1);
}

process.on('uncaughtException', handleErrors);

async function init(pathToFile: string) {
  exportStaticFiles();
  const source = JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
  const interfaceService = CreateInterfaceService.newInstance();
  interfaceService.createMultiple(source.types);
  const clientService = ClientService.newInstance();
  clientService.createMultiple(source.clients);
}

init('sdk.json');
