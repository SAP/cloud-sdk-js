import { readFileSync } from 'fs';
import { sep } from 'path';
import { unixEOL } from '@sap-cloud-sdk/util'
import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import axios, { AxiosResponse } from 'axios';
import { AnalyticsData, getAnalyticsData } from './analytics-data';
import {
  SwaRequestParameters,
  UsageAnalyticsOptions,
  UsageAnalyticsProjectConfig
} from './analytics-types';
import { enforceValidConfig, findConfigPath } from './config';

const usageAnalyticsBlog =
  'https://blogs.sap.com/2018/10/23/usage-analytics-s4sdk/';
const defaultURI =
  'https://webanalytics.cfapps.eu10.hana.ondemand.com/tracker/log';
const logger = createLogger('usage-analytics');

const defaultParameters: SwaRequestParameters = {
  action_name: 'SAP S/4HANA Cloud SDK',
  url: 'https://blogs.sap.com/2018/10/23/usage-analytics-s4sdk/',
  idsite: 'b67a7f90-dc52-72f0-cbac-18bf4147456a',
  idsitesub: 'test-jssdk',
  event_type: 'npm_install'
};

const defaultOptions = {
  useSalt: true,
  uri: defaultURI,
  idsitesub: defaultParameters.idsitesub,
  event_type: defaultParameters.event_type
};

/**
 * Get and send development environment data based on the context of the given caller path using the given options.
 * The callerPath is necessary to determine whether usage analytics data will be sent or not.
 *
 * @param callerPath - Abolute path of the script from which the function is called
 * @param options - Usage analytic options
 * @hidden
 */
export async function performUsageAnalytics(
  callerPath: string,
  options: UsageAnalyticsOptions = {}
): Promise<void> {
  try {
    if (calledFromCentralDependency(callerPath)) {
      const configPath = findConfigPath();
      let config: UsageAnalyticsProjectConfig =
        configPath && JSON.parse(readFileSync(configPath, 'utf8'));

      if (config?.enabled) {
        config = enforceValidConfig(config);
        const data = await getAnalyticsData(config);
        await sendAnalyticsData(config, data, options).catch(
          logErrorAndContinue
        );
        printThanksAndDisclaimer();
        printCollectedData(data);
      }
    }
  } catch (error) {
    logErrorAndContinue(error);
  }
}

/**
 * Sends development environment data to SAP Web Analytics.
 * For detailed information, check https://github.com/SAP/cloud-sdk-cli/blob/main/usage-analytics.md
 *
 * @param config - Configuration for web analytics.
 * @param data - Data to be sent.
 * @param options - Analytics options
 * @returns A promise to the response of the request
 * @hidden
 */
export async function sendAnalyticsData(
  config: UsageAnalyticsProjectConfig,
  data: AnalyticsData,
  options: UsageAnalyticsOptions = {}
): Promise<AxiosResponse | void> {
  if (!config.enabled) {
    return;
  }

  const mergedOption = { ...defaultOptions, ...options };

  return axios
    .get(mergedOption.uri, {
      params: {
        ...getSWAParameters(mergedOption),
        ...payloadToCustomParameters(data)
      }
    })
    .catch(error => {
      throw new ErrorWithCause('Failed to send usage analytics data.', error);
    });
}

/**
 * Creates SAP Web Analytics regular parameters.
 *
 * @param options - Request options
 * @returns SAP Web Analytics regular parameters
 * @hidden
 */
function getSWAParameters(
  options: UsageAnalyticsOptions
): SwaRequestParameters {
  return {
    action_name: defaultParameters.action_name,
    url: defaultParameters.url,
    idsite: defaultParameters.idsite,
    idsitesub: options.idsitesub
      ? options.idsitesub
      : defaultParameters.idsitesub,
    event_type: options.event_type
      ? options.event_type
      : defaultParameters.event_type
  };
}

function calledFromCentralDependency(callerPath: string): boolean {
  const numNodeModulesInPath = callerPath
    .split(sep)
    .filter(dir => dir === 'node_modules').length;

  // Assuming that npm will always flatten/dedupe dependencies when it can, we can deduce the following
  // If there is no "node_modules" in the given path, this script is probably called as part of the SDK dev lifecycle
  // If there are more than 1 "node_modules" path segments, this dependency is the dependency of another dependency
  // This can happen if users depend on e.g. core@1.2.3 and bupa@1.2.4 (then there will be both core@1.2.3 and core@1.2.4)
  // Only if there is exactly one "node_modules" path segment, this script is called on the postinstall of a direct dependency to core
  return numNodeModulesInPath === 1;
}

/**
 * Creates SAP Web Analytics custom parameters. It maps user data to an object format compliant with SAP Web Analytics requirements.
 * Example:
 * {
 *   project_id: "myProjectId",
 *   os: "myOsInfo",
 *   node: "nodeVersion",
 *   npm: "npmVersion",
 *   typescript: "false",
 *   sdk_dependencies: "myCloudDependencies",
 *   third_party_dependencies: "myDependencies"
 * }
 * is converted to
 * {
 *   custom1: "project_id",
 *   e_a: "myProjectId",
 *   custom2: "os",
 *   e_2: "myOsInfo",
 *   custom3: "node",
 *   e_3: "nodeVersion",
 *   custom4: "npm",
 *   e_4: "npmVersion",
 *   custom5: "typescript",
 *   e_5: "false",
 *   custom6: "sdk_dependencies",
 *   e_6: "myCloudDependencies",
 *   custom7: "third_party_dependencies",
 *   e_7: "myDependencies"
 * }
 *
 * Notice: Properties order of the passed parameters is relevant in determining the values of the mapped object.
 *
 * @param params - User data
 * @returns SAP Web Analytics custom parameters
 * @hidden
 */
function payloadToCustomParameters(
  params: AnalyticsData
): Record<string, string> {
  let i = 1;

  return Object.entries(params).reduce((prev, [key, value]) => {
    prev['custom' + i] = key;
    prev['e_' + (i === 1 ? 'a' : i)] = value;
    i++;
    return prev;
  }, {});
}

function printThanksAndDisclaimer(): void {
  logger.info(`SAP Cloud SDK - Usage Analytics
  Thank you for contributing to our anonymized usage statistics. This allows us to improve the SAP Cloud SDK based on your usage.
  We respect your privacy and intellectual property. Therefore, we only collect non-sensitive data about the use of the SDK.
  We do not collect personal information or data about the inner workings of your project. If you prefer to opt out or want to learn more, visit:
  ${usageAnalyticsBlog}
  `);
}

function printCollectedData(data: AnalyticsData): void {
  logger.info(`The following data has been collected:${unixEOL}`);
  logger.info(JSON.stringify(data, null, 2));
}

function logErrorAndContinue(error: Error): void {
  logger.error(
    'Something went wrong while trying to send usage analytics data!'
  );
  logger.error(error.stack!);
}
