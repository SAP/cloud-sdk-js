/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { VdmProperty } from '../vdm-types';

export function hasEdmTypeProperty(properties: VdmProperty[]): boolean {
  return properties.some(prop => !prop.isComplex);
}

export function hasComplexTypeProperty(properties: VdmProperty[]): boolean {
  return properties.find(prop => prop.isComplex === true) !== undefined;
}
