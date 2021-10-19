import { resolve } from 'path';
import { checkApiOfPackage } from './check-public-api';

/*
For a deatailed explaination what is happening here have a look at `0007-public-api-check.md` in the implementation documentation.
 */
async function checkApiPackages() {
  await checkApiOfPackage(resolve(__dirname, '../packages/connectivity'));
  await checkApiOfPackage(resolve(__dirname, '../packages/http-client'));
}

checkApiPackages();
