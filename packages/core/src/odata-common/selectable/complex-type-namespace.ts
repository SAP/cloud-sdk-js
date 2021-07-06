import { EdmTypeShared } from '../edm-types';

export interface ComplexTypeNamespace<ComplexT> {
  _propertyMetadata: PropertyMetadata<ComplexT>[];
}

export interface PropertyMetadata<ComplexT = any> {
  name: keyof ComplexT;
  originalName: string;
  type: EdmTypeShared<'any'> | ComplexTypeNamespace<any>;
  isCollection?: boolean;
}

export function isComplexTypeNameSpace(
  val: any
): val is ComplexTypeNamespace<any> {
  return typeof val === 'object' && '_propertyMetadata' in val;
}
