import { resolve } from 'path';
import { checkApiOfPackage } from './check-public-api';

/*
For a detailed explanation what is happening here have a look at `0007-public-api-check.md` in the implementation documentation.
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
  await checkApiOfPackage(
    resolve(__dirname, '../packages/temporal-de-serializers')
  );
}

process.on('unhandledRejection', function (err) {
  console.error(err);
  process.exit(1);
});

checkApiPackages();
