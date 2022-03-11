import { createLogger } from '@sap-cloud-sdk/util';
import { checkApiOfPackage } from './check-public-api';

const logger = createLogger('check-public-api');

/*
For a detailed explanation what is happening here have a look at `0007-public-api-check.md` in the implementation documentation.
 */
checkApiOfPackage(process.cwd()).catch(err => {
  logger.error(err);
  process.exit(1);
});
