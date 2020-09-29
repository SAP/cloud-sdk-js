/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { EntityBase } from '../odata/common';

export const nonEnumerable = (target: any, propertyKey: string) => {
  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
  if (descriptor.enumerable !== false) {
    descriptor.enumerable = false;
    descriptor.writable = true;
    Object.defineProperty(target, propertyKey, descriptor);
  }
};

/**
 * Checks if the property with name key of the entity is a navigation property.
 * @param key name of the property
 * @param entity to be checked
 * @returns boolean
 */
export function isNavigationProperty(key: string, entity: EntityBase): boolean {
  if (!entity[key]) {
    return false;
  }

  if (
    entity[key] instanceof EntityBase ||
    entity[key][0] instanceof EntityBase
  ) {
    return true;
  }

  return false;
}
