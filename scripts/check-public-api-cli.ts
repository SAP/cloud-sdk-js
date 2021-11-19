import { resolve } from 'path';
import { checkApiOfPackage } from './check-public-api';

/*
For a deatailed explaination what is happening here have a look at `0007-public-api-check.md` in the implementation documentation.
 */
async function checkApiPackages() {
  await checkApiOfPackage(resolve(__dirname, '../packages/connectivity'));
  await checkApiOfPackage(resolve(__dirname, '../packages/http-client'));
  await checkApiOfPackage(resolve(__dirname, '../packages/openapi'));
  await checkApiOfPackage(resolve(__dirname, '../packages/odata-common'));
  await checkApiOfPackage(resolve(__dirname, '../packages/odata-v2'));
  await checkApiOfPackage(resolve(__dirname, '../packages/odata-v4'));
  await checkApiOfPackage(resolve(__dirname, '../packages/generator-common'));
  await checkApiOfPackage(resolve(__dirname, '../packages/generator'));
  await checkApiOfPackage(resolve(__dirname, '../packages/openapi-generator'));
}

checkApiPackages();
