import {upperCaseSnakeCase} from "@sap-cloud-sdk/util";

/**
 * @internal
 * @param target
 * @param propertyKey
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
 * @param entityConstructor - Constructor of the entity.
 * @returns A boolean denoting whether an entity is a navigation property or not.
 */
export function isNavigationProperty(
  key: string,
  entityConstructor: any
): boolean {
  return '_linkedEntity' in entityConstructor[upperCaseSnakeCase(key)];
}
