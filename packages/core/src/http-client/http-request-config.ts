import { createLogger, exclude } from '@sap-cloud-sdk/util';

const logger = createLogger({
  package: 'core',
  messageContext: 'http-request-config'
});

/**
 * Filter disallowed keys from a given custom request config object.
 * @param customRequestConfig a given custom request config object to be filtered
 * @param disallowedKeys A list of keys that are not allowed to be customized.
 * @returns Filtered custom request configs object.
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
  return exclude(disallowedKeys, customRequestConfig) as Record<
    string,
    string
  >;
}

const defaultDisallowedKeys = [
  'method',
  'url',
  'data',
  'headers',
  'params'
];
