import { createLogger, exclude } from '@sap-cloud-sdk/util';
import {
  HttpRequestConfig, HttpRequestConfigWithOrigin, OptionWithOrigin, Origin,
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
 * @param configWithOrigin
 * @internal
 */
export function buildHttpRequestConfig(configWithOrigin: HttpRequestConfigWithOrigin): HttpRequestConfig{
  const requestConfig = configWithOrigin as HttpRequestConfig;
  requestConfig.headers = getOptionWithPriority(configWithOrigin.headers);
  requestConfig.params = getOptionWithPriority(configWithOrigin.params);
  return requestConfig;
}

function getOptionWithPriority(headersOrParams?: Record<string, ValueWithOrigin>): Record<string, string> | undefined {
  if (headersOrParams){
    return Object.entries(headersOrParams).reduce(
      (prev, [key, valueWithOrigin]) => {
        const value = getValueWithPriority(valueWithOrigin);
        if(value){
          prev[key] = value
        }
        return prev;
      }, { } as Record<string, string>
    );
  }
}

/**
 *
 * @param valueWithOrigin
 * @internal
 */
export function getValueWithPriority(valueWithOrigin: ValueWithOrigin): string | undefined{
  return valueWithOrigin.Custom || valueWithOrigin.DestinationProperty || valueWithOrigin.Destination || valueWithOrigin.RequestConfig;
}

// export function buildOptionWithOrigin(origin: Origin, option?: Record<string, string>): Record<string, ValueWithOrigin> | undefined{
//   if(option){
//     return Object.entries(option).reduce((prev, [key, value]) => {
//       prev.key = {[origin]: value};
//       return prev;
//     }, {} as Record<string, ValueWithOrigin>)
//   }
// }

/**
 *
 * @param optionsWithOrigin
 * @internal
 */
export function mergeOptionsWithOrigin(...optionsWithOrigin: OptionWithOrigin[]): Record<string, ValueWithOrigin>{
  return optionsWithOrigin.reduce((prevOptionWithOrigin, currentOptionWithOrigin) => {
    if (currentOptionWithOrigin.option) {
      Object.entries(currentOptionWithOrigin.option).reduce((prev, [key, value]) => {
        //todo fix merge
        prev[key] = { [currentOptionWithOrigin.origin]: value };
        return prev;
      }, prevOptionWithOrigin);
    }
    return prevOptionWithOrigin;
  }, {} as Record<string, ValueWithOrigin>)
}
