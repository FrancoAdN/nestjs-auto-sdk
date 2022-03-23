import * as fs from 'fs';
import { CreateInterfaceService } from './services/interface.service';
import { exportStaticFiles } from './helpers/create-file.helper';

async function init(pathToFile: string) {
  exportStaticFiles();
  const source = JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
  const interfaceService = CreateInterfaceService.newInstance();
  interfaceService.createMultiple(source.types);
}

init('sdk.json');
