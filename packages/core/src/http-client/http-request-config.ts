import { createLogger, pickWithoutKeys } from '@sap-cloud-sdk/util';

const logger = createLogger({
  package: 'core',
  messageContext: 'http-request-config'
});

/**
 * Filter disallowed keys from a given custom request configs object.
 * @param customRequestConfigs a given custom request configs object to be filtered
 * @param disallowedKeys A list of keys that are not allowed to be customized.
 * @returns Filtered custom request configs object.
 */
export function filterCustomRequestConfigs(
  customRequestConfigs: Record<string, string>,
  disallowedKeys = defaultDisallowedKeysOfCustomRequestConfigs
): Record<string, string> {
  const removedKeys = Object.keys(customRequestConfigs).filter(key =>
    disallowedKeys.includes(key)
  );
  if (removedKeys.length) {
    logger.warn(
      `The following keys are found in the custom request config that will be removed: ${removedKeys.join(
        ', '
      )}`
    );
  }
  return pickWithoutKeys(disallowedKeys, customRequestConfigs) as Record<
    string,
    string
  >;
}

const defaultDisallowedKeysOfCustomRequestConfigs = [
  'method',
  'url',
  'data',
  'headers',
  'params'
];
