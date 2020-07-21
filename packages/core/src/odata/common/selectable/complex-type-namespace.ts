/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { EdmTypeShared } from '../edm-types';

export interface ComplexTypeNamespace {
  _propertyMetadata: PropertyMetadata[];
}

export interface PropertyMetadata {
  name: string;
  originalName: string;
  type: EdmTypeShared<'any'> | ComplexTypeNamespace;
}

export function isComplexTypeNameSpace(val: any): val is ComplexTypeNamespace {
  return typeof val === 'object' && '_propertyMetadata' in val;
}
