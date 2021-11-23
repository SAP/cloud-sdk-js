import { createLogger, exclude } from '@sap-cloud-sdk/util';
import {
  HttpRequestConfig,
  HttpRequestConfigWithOrigin,
  OptionWithOrigin,
  ValueWithOrigin
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
  requestConfig.headers = getOptionWithPriority(configWithOrigin.headers);
  requestConfig.params = getOptionWithPriority(configWithOrigin.params);
  return requestConfig;
}

/**
 * Build http request options from given options with origin information. When reaching conflicts, values with higher priority are chosen.
 * @param headersOrParams - The given options with origin information
 * @returns The resulting options
 * @internal
 */
export function getOptionWithPriority(
  headersOrParams?: Record<string, ValueWithOrigin>
): Record<string, string> | undefined {
  if (headersOrParams) {
    return Object.entries(headersOrParams).reduce(
      (prev, [key, valueWithOrigin]) => {
        const value = getValueWithPriority(valueWithOrigin);
        if (value) {
          prev[key] = value;
        }
        return prev;
      },
      {} as Record<string, string>
    );
  }
}

/**
 * Pick the value with highest priority, defined by origin.
 * @param valueWithOrigin - Values with origin information
 * @returns The value with highest priority.
 * @internal
 */
export function getValueWithPriority(
  valueWithOrigin: ValueWithOrigin
): string | undefined {
  return (
    valueWithOrigin.Custom ||
    valueWithOrigin.DestinationProperty ||
    valueWithOrigin.Destination ||
    valueWithOrigin.RequestConfig
  );
}

/**
 * Merge all the options to one object with the origin information
 * @param optionsWithOrigin - One or multiple objects that contains http request options with origin information
 * @returns The merged object
 * @internal
 */
export function mergeOptionsWithOrigin(
  ...optionsWithOrigin: OptionWithOrigin[]
): Record<string, ValueWithOrigin> {
  return optionsWithOrigin.reduce(
    (prevOptionWithOrigin, currentOptionWithOrigin) => {
      if (currentOptionWithOrigin.option) {
        Object.entries(currentOptionWithOrigin.option).reduce(
          (prev, [optionKey, optionValue]) => {
            if (prev[optionKey]) {
              prev[optionKey][currentOptionWithOrigin.origin] = optionValue;
            } else {
              prev[optionKey] = {
                [currentOptionWithOrigin.origin]: optionValue
              };
            }
            return prev;
          },
          prevOptionWithOrigin
        );
      }
      return prevOptionWithOrigin;
    },
    {} as Record<string, ValueWithOrigin>
  );
}
