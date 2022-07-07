import { execSync } from 'child_process';
import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('check-if-madge-is-working');

try {
  execSync(
    'madge --extensions ts --ts-config=../../../tsconfig.json --circular ./test-modules',
    { stdio: 'ignore' }
  );
} catch (error) {
  logger.info('Circular dependency detected as expected.');
  process.exit(0);
}

logger.error(
  "Madge is not working! Circular dependency in 'test-modules' does not lead to an error!"
);
process.exit(1);
