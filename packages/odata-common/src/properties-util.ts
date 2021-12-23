import { upperCaseSnakeCase } from '@sap-cloud-sdk/util';

/**
 * Make property non enumerable
 * @param target - Object to be adjusted
 * @param propertyKey - property key which is adjusted.
 * @internal
 */
export const nonEnumerable = (target: any, propertyKey: string): void => {
  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
  if (descriptor.enumerable !== false) {
    descriptor.enumerable = false;
    descriptor.writable = true;
    Object.defineProperty(target, propertyKey, descriptor);
  }
};

/**
 * Checks if the property with name key of the entity is a navigation property.
 * @param key - Name of the property.
 * @param schema - Schema which contains the potential navigation property.
 * @returns A boolean denoting whether an entity is a navigation property or not.
 * @internal
 */
export function isNavigationProperty(
  key: string,
  schema: Record<string, any>
): boolean {
  return !!schema[upperCaseSnakeCase(key)]?._linkedEntityApi;
}
