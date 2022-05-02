import { execSync } from 'child_process';
import { unixEOL, createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('check-if-type-tests-are-working');

try {
  execSync('dtslint --expectOnly --localTs ../../node_modules/typescript/lib self-test', { stdio: 'ignore' });
} catch (error) {
  logger.info('Type tests are working!');
  process.exit(0);
}

logger.error('Type tests are not working! Obvious errors were passed!');
process.exit(1);