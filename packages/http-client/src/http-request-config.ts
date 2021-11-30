import { createLogger, exclude, mergeIgnoreCase } from '@sap-cloud-sdk/util';
import {
  HttpRequestConfig,
  HttpRequestConfigWithOrigin,
  Origin,
  OriginOptions
} from './http-client-types';

const logger = createLogger({
  package: 'http-client',
  messageContext: 'http-request-config'
});

/**
 * Filter disallowed keys from a given custom request config object.
 * @param customRequestConfig - a given custom request config object to be filtered
 * @param disallowedKeys - A list of keys that are not allowed to be customized.
 * @returns Filtered custom request config object.
 * @internal
 */
export function filterCustomRequestConfig(
  customRequestConfig: Record<string, string>,
  disallowedKeys = defaultDisallowedKeys
): Record<string, string> {
  const removedKeys = Object.keys(customRequestConfig).filter(key =>
    disallowedKeys.includes(key)
  );
  if (removedKeys.length) {
    logger.warn(
      `The following keys are found in the custom request config that will be removed: ${removedKeys.join(
        ', '
      )}`
    );
  }
  return exclude(disallowedKeys, customRequestConfig) as Record<string, string>;
}

/**
 * A list of request config keys that are not allowed to be customized by default.
 */
const defaultDisallowedKeys = [
  'method',
  'url',
  'baseURL',
  'data',
  'headers',
  'params'
];

/**
 * Build [[HttpRequestConfig]] from [[HttpRequestConfigWithOrigin]]
 * @param configWithOrigin - An http request config with origin information
 * @returns The resulting [[HttpRequestConfig]]
 * @internal
 */
export function buildHttpRequestConfig(
  configWithOrigin: HttpRequestConfigWithOrigin
): HttpRequestConfig {
  const requestConfig = configWithOrigin as HttpRequestConfig;
  requestConfig.headers = mergeOptionsWithPriority(configWithOrigin.headers);
  requestConfig.params = mergeOptionsWithPriority(configWithOrigin.params);
  return requestConfig;
}

/**
 * Merge options from a given [[OriginOptions]]. When reaching conflicts, values with higher priorities are chosen.
 * @param headersOrParams - Given options with origin information.
 * @returns The resulting merged options.
 */
export function mergeOptionsWithPriority(
  headersOrParams?: OriginOptions
): Record<string, string> | undefined {
  if (headersOrParams) {
    return getAllOriginsAsc().reduce(
      (prev, origin) => mergeIgnoreCase(prev, headersOrParams[origin]),
      {} as Record<string, string>
    );
  }
}

/**
 * Get all [[Origin]]s as an array in an ascent order (from low to high priority).
 * @returns Origins in an ascent oder.
 */
export function getAllOriginsAsc(): Origin[] {
  return ['RequestConfig', 'Destination', 'DestinationProperty', 'Custom'];
}
