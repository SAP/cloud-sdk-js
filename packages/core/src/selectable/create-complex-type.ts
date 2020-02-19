/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

export function createComplexType<ComplexT>(json, converters): ComplexT {
  return Object.entries(json).reduce(
    (complexTypeInstance, [jsonKey, jsonValue]) => ({ ...complexTypeInstance, ...converters[jsonKey](jsonValue) }),
    {}
  );
}
