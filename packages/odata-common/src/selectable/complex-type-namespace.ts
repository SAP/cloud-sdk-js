import { EdmTypeShared } from '../edm-types';

/**
 * @internal
 */
export interface ComplexTypeNamespace<ComplexT> {
  _propertyMetadata: PropertyMetadata<ComplexT>[];
}

export interface PropertyMetadata<ComplexT = any> {
  name: keyof ComplexT;
  originalName: string;
  type: EdmTypeShared<'any'> | ComplexTypeNamespace<any>;
  isCollection?: boolean;
}

/**
 * Typeguard for the ComplexTypeNamespace
 * @param val - value to be checked
 * @returns boolean
 * @internal
 */
export function isComplexTypeNameSpace(
  val: any
): val is ComplexTypeNamespace<any> {
  return typeof val === 'object' && '_propertyMetadata' in val;
}
