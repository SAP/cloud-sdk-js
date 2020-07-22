/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { EdmTypeShared } from '../edm-types';

export interface ComplexTypeNamespace<ComplexT> {
  _propertyMetadata: PropertyMetadata[];
  _complexType: ComplexT;
}

export interface PropertyMetadata {
  name: string;
  originalName: string;
  type: EdmTypeShared<'any'> | ComplexTypeNamespace<any>;
}

export function isComplexTypeNameSpace(
  val: any
): val is ComplexTypeNamespace<any> {
  return typeof val === 'object' && '_propertyMetadata' in val;
}
