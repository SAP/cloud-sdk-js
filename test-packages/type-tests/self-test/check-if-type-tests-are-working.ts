import { execSync } from 'child_process';
import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('check-if-type-tests-are-working');

try {
  execSync('dtslint --expectOnly --localTs ../../node_modules/typescript/lib self-test', { stdio: 'ignore' });
} catch (error) {
  logger.info('Faulty type tests \'error-test.spec.ts\' fails as expected.');
  process.exit(0);
}

logger.error('Type tests are not working! Faulty type test \'error-test.spec.ts\' did not lead to a test failure!');
process.exit(1);