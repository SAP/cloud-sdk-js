/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

/**
 * @hidden
 */
export const nonEnumerable = (target: any, propertyKey: string) => {
  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
  if (descriptor.enumerable !== false) {
    descriptor.enumerable = false;
    descriptor.writable = true;
    Object.defineProperty(target, propertyKey, descriptor);
  }
};
