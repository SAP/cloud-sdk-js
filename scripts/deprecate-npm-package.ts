import execa from "execa";
import semver from "semver";
const retry =  require("async-retry");

interface DeprecateOptions {
  deprecateMessage: string;
  packageNamesToBeDeprecated: string[];
  versionsToBeDeprecated: string;
}

const deprecateOptions: DeprecateOptions = {
  deprecateMessage: "1.x is no longer maintained.",
  packageNamesToBeDeprecated: [
    "@sap-cloud-sdk/analytics",
    "@sap-cloud-sdk/core",
    "@sap-cloud-sdk/eslint-config",
    "@sap-cloud-sdk/generator",
    "@sap-cloud-sdk/generator-common",
    "@sap-cloud-sdk/openapi-generator",
    "@sap-cloud-sdk/test-util",
    "@sap-cloud-sdk/util"
  ],
  // todo ^1.17.4-0 for all alpha versions
  versionsToBeDeprecated: `<1.54.0`,
  // versionTobeTested: '1.54.0'
}
// deprecate command with semver - npm deprecate @sap-cloud-sdk/openapi-generator@"< 1.54.3" "1.x is no longer maintained."
// check whether a package/version is deprecated - npm view @sap-cloud-sdk/openapi-generator@"< 1.54.2"
// check all the versions - `npm view @sap-cloud-sdk/util versions`
async function deprecateNmpPackage(){
  const responses = await Promise.all(deprecateOptions.packageNamesToBeDeprecated.map(
    async packageName => {
      const resVersions = await execa('npm', ['view', packageName, 'versions']);
      const allVersions = resVersions.stdout.replace(/'|\s|\[|]/g, '').split(',');
      const uniqueVersionPrefixes = Array.from(new Set(allVersions.map(version => {
          // Pick prefix of a version. e.g., 1.34.1-20201230083713.13 will be 1.34.1
          const prefix = version.match(/(1\.\d+\.\d+).*/)
          let ret = prefix? prefix[1] : undefined;
          // ret = (ret && semver.gt(ret, '1.36.2')) ? ret : undefined;
          return ret;
        }
      ).filter(e => !!e))) as string[];

      const deprecateVersion = uniqueVersionPrefixes.map(prefix => `~${prefix}-0`).join(' || ');
      console.log(`[Deprecating]: ${packageName}@${deprecateVersion}`);
      try {
        await execa('npm', ['deprecate', `${packageName}@${deprecateVersion}`, deprecateOptions.deprecateMessage]);
      } catch (e) {
        // 422 means this version was deprecated before
        if(!e?.message?.includes('422 Unprocessable Entity')){
          throw new Error(e);
        }
      }

      /**
        `~1.0.0-0` will match:
        - `1.0.0-xyz` (canary version)
        - `1.0.x` (stable version)
        but NOT 1.0.1-xyz.
        So there is no way to match both versions below and you need multiple commands:
        - `1.0.0-xyz`
        - `1.0.1-xyz`
      */
      // await blockAsync(uniqueVersionPrefixes, 0, deprecateCanaryVersion, {packageName, deprecateMessage: deprecateOptions.deprecateMessage});
      // await Promise.all(Array.from(uniqueVersionPrefixes).map(
      //   async prefix => {
      //     const deprecateVersion = `~${prefix}-0`;
      //     console.log(`Deprecating: ${packageName}@${deprecateVersion}`);
      //     return execa('npm', ['deprecate', `${packageName}@${deprecateVersion}`, deprecateOptions.deprecateMessage]);
      //   }
      // ));

      // const res1 =

        // await execa('npm', ['deprecate', `@sap-cloud-sdk/openapi-generator@1.54.0`, '1.x is no longer maintained.'])
        // await spawn('npm', ['deprecate', `${packageName}@${deprecateOptions.versionsToBeDeprecated}`, deprecateOptions.deprecateMessage])
        // await execa('npm', ['deprecate', `${packageName}@${deprecateOptions.versionsToBeDeprecated}`, deprecateOptions.deprecateMessage])
        // await execa.commandSync(`npm deprecate ${packageName}@${deprecateOptions.versionsToBeDeprecated} ${deprecateOptions.deprecateMessage}`, {shell: true});
        // execa('npm', ['deprecate', `${packageName}@${deprecateOptions.versionsToBeDeprecated}`, deprecateOptions.deprecateMessage])

      // console.log(res1.stdout);
      // const res2 = await execa('npm', ['view', `${packageName}@${deprecateOptions.versionTobeTested}`])
      // console.log(res2);
      // return res2.stdout;
    }
  ));
  // responses.map(res => {
  //   if(!res.includes('DEPRECATED')){
  //     throw new Error(`Deprecation failed: ${res}`);
  //   }
  // })
}

/**
 * Execute promise one by one in a loop, which is needed when remote service has limits.
 * @param taskIDs - An array that contains the IDs of all the tasks.
 * @param index - The index of the current task.
 * @param taskFn - A task function to be executed for this loop.
 * @param taskParams - An object that contains all other task parameters.
 */
async function blockAsync(taskIDs: any[], index: number, taskFn: (taskID, taskParam?) => Promise<any>, taskParams? ): Promise<any> {
  const taskID = taskIDs[index];
  await retry(
    () => taskFn(taskID, taskParams),
    {
      retries: 5,
    }
  )
  // await taskFn(taskID, taskParams);
  index++;
  if(index < taskIDs.length){
    return await blockAsync(taskIDs, index, taskFn, taskParams);
  }
}

async function deprecateCanaryVersion(versionPrefix: string, { packageName, deprecateMessage }: { packageName: string, deprecateMessage: string}){
    const deprecateVersion = `~${versionPrefix}-0`;
    console.log(`[Deprecating]: ${packageName}@${deprecateVersion}`);
    try {
      await execa('npm', ['deprecate', `${packageName}@${deprecateVersion}`, deprecateMessage]);
    } catch (e) {
      // 422 means this version was deprecated before
      if(!e?.message?.includes('422 Unprocessable Entity')){
        throw new Error(e);
      }
    }
    console.log(`[Done]: ${packageName}@${deprecateVersion}`)
}

deprecateNmpPackage()
