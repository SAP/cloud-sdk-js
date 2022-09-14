import { execSync } from 'child_process';
import { resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('check-if-dtslint-are-working');
try {
  execSync('yarn tsd', { stdio: 'pipe', cwd: resolve(__dirname, '../') });
} catch (error: any) {
  if (
    !(error.stack as string).includes(
      'Argument of type string is not assignable to parameter of type number.'
    )
  ) {
    logger.error('command does not contain the message of wrong type');
    process.exit(1);
  }
  logger.info("Faulty type test 'error-test.test-d.ts' fails as expected.");
  process.exit(0);
}

logger.error(
  "Type tests are not working! Faulty type test 'error-test.test-d.ts' did not lead to a test failure!"
);
process.exit(1);
