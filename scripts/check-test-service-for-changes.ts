import { execSync } from 'child_process';
import { unixEOL, createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('check-test-service-for-changes');

const git_diff = execSync('git diff', { encoding: 'utf8' });
if (git_diff) {
  logger.error(
    `The test services need to be updated, please generate them again. See git diff result: ${unixEOL} ${git_diff}`
  );
  process.exit(1);
}
