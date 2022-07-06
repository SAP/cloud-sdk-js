import execa from 'execa';

interface DeprecateOptions {
  deprecateMessage: string;
  packageNamesToBeDeprecated: string[];
  versionsToBeDeprecated: RegExp;
  isProduction?: boolean;
}

/**
 * Options for deprecating npm packages by using this script
 * `npm deprecate` (https://docs.npmjs.com/cli/v8/commands/npm-deprecate) supports using semver for specifying versions.
 *  However, canary version cannot be deprecated easily.
 *  e.g., `~1.0.0-0` will match:
 *  - `1.0.0-xyz` (canary version)
 *  - `1.0.x` (stable version)
 *  but NOT 1.0.1-xyz (canary version)
 *  Therefore, to match both versions below and you need a union version (~1.0.0-0 || ~1.0.1-0) or multiple commands:
 *  - `1.0.0-xyz`
 *  - `1.0.1-xyz`
 *  We should not use multiple commands, as the server has certain limit.
 */
const deprecateOptions: DeprecateOptions = {
  /**
   * Deprecate message for all packages/versions to be deprecated.
   */
  deprecateMessage: '1.x is no longer maintained.',
  /**
   * Package names to be deprecated
   */
  packageNamesToBeDeprecated: [
    '@sap-cloud-sdk/analytics',
    '@sap-cloud-sdk/core',
    '@sap-cloud-sdk/eslint-config',
    '@sap-cloud-sdk/generator',
    '@sap-cloud-sdk/generator-common',
    '@sap-cloud-sdk/openapi-generator',
    '@sap-cloud-sdk/test-util',
    '@sap-cloud-sdk/util'
  ],
  /**
   * Regex used as a filter, indicating which versions should be deprecated.
   * The group is crucial for picking the stable version prefix, which cannot be removed.
   * Check the doc of the `deprecateOptions` object for more details.
   */
  versionsToBeDeprecated: /^(1\.\d+\.\d+)/,
  /**
   * When setting to `false`, it only shows the npm command for review.
   * When setting to `true`, it will EXECUTE the npm deprecate command.
   * Please do keep `false` for the remote branch, so it's used as default value.
   */
  isProduction: false
};

/**
 * Main entry point for deprecating the SDK packages.
 * Here are some npm command examples, that are related to the deprecation.
 * [deprecate command with semver] - npm deprecate @sap-cloud-sdk/openapi-generator@"< 1.54.3" "1.x is no longer maintained."
 * [check whether a package/version is deprecated] - npm view @sap-cloud-sdk/openapi-generator@"< 1.54.2"
 * [check all existing versions of a package] - `npm view @sap-cloud-sdk/util versions`
 */
async function deprecateNpmPackage() {
  const responses = await Promise.all(
    deprecateOptions.packageNamesToBeDeprecated.map(async packageName => {
      const resVersions = await execa('npm', ['view', packageName, 'versions']);
      const allVersions = resVersions.stdout
        .replace(/'|\s|\[|]/g, '')
        .split(',');
      const uniqueVersionPrefixes = Array.from(
        new Set(
          allVersions
            .map(version => {
              // Pick the prefix of a version. e.g., 1.34.1-20201230083713.13 will be 1.34.1
              const prefix = version.match(
                deprecateOptions.versionsToBeDeprecated
              );
              return prefix ? prefix[1] : undefined;
            })
            .filter(e => !!e)
        )
      ) as string[];
      // Build a command like `npm deprecate @sap-cloud-sdk/generator@~1.17.4-0 || ~1.18.0-0 || ~1.18.1-0 || ~1.18.2-0`
      // With `-0` as suffix, it should match all our canary versions for A specific stable version.
      const deprecateVersion = uniqueVersionPrefixes
        .map(prefix => `~${prefix}-0`)
        .join(' || ');
      console.log(`[Deprecating]: ${packageName}@${deprecateVersion}`);
      if (deprecateOptions.isProduction) {
        try {
          await execa('npm', [
            'deprecate',
            `${packageName}@${deprecateVersion}`,
            deprecateOptions.deprecateMessage
          ]);
        } catch (e) {
          // 422 means this version was deprecated before
          if (!e?.message?.includes('422 Unprocessable Entity')) {
            throw new Error(e);
          }
        }
        console.log(`[Done]: ${packageName}@${deprecateVersion}`);
      } else {
        console.log(`[Test]: will execute the following command:\n`);
        console.log(
          `npm deprecate ${packageName}@"${deprecateVersion}" "${deprecateOptions.deprecateMessage}"`
        );
      }
    })
  );
}

deprecateNpmPackage();
