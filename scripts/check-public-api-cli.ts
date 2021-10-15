import { resolve } from 'path';
import { checkApiOfPackage } from './check-public-api';

/*
For a deatailed explaination what is happening here have a look at `0007-public-api-check.md` in the implementation documentation.
 */
checkApiOfPackage(resolve(__dirname, '../packages/connectivity'));
