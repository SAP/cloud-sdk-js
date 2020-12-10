import execa = require('execa');
import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('scripts')

const packageName = '@sap-cloud-sdk/core';
// const packageName ='@sap-cloud-sdk/util'
// const packageName ='@sap-cloud-sdk/analytics'
// const packageName ='@sap-cloud-sdk/test-util'
// const packageName ='@sap-cloud-sdk/generator'

const dryRun = true;

async function deprecateVersions() {
  const response = await execa('npm', [
    'view',
    packageName,
    'versions',
    '--json'
  ]);
  const allVersions = JSON.parse(response.stdout);
  const relevantVersions = allVersions.filter(version =>
    version.match(/.*\-\w{8,8}\.\w/)
  );
  console.log(relevantVersions);
  for (let i in relevantVersions) {
    const reason =
      'The used prerelease version did not fulfill semantic versioning.';
    const packageToBeRemoved = `${packageName}@${relevantVersions[i]}`;
    const npmArguments = ['deprecate', packageToBeRemoved, reason];
    if (!dryRun) {
      await execa('npm', npmArguments);
    } else {
      logger.info(`Run npm with arguments: ${JSON.stringify(npmArguments)}`);
    }
  }
}

deprecateVersions();
