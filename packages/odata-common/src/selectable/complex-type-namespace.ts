import { EdmTypeShared } from '../edm-types';

/**
 * Interface to represent meta information on the _propertyMetadata property of a complex type.
 */
export interface ComplexTypeNamespace<ComplexT> {
  /**
   * TODO-JSDOC.
   */
  _propertyMetadata: PropertyMetadata<ComplexT>[];
}

/**
 * Interface to represent meta information on a property of a complex type.
 */
export interface PropertyMetadata<ComplexT = any> {
  /**
   * TODO-JSDOC.
   */
  name: keyof ComplexT;
  /**
   * TODO-JSDOC.
   */
  originalName: string;
  /**
   * TODO-JSDOC.
   */
  type: EdmTypeShared<'any'> | ComplexTypeNamespace<any>;
  /**
   * TODO-JSDOC.
   */
  isCollection?: boolean;
}

/**
 * Type guard for the ComplexTypeNamespace
 * @param val - value to be checked
 * @returns boolean
 * @internal
 */
export function isComplexTypeNameSpace(
  val: any
): val is ComplexTypeNamespace<any> {
  return typeof val === 'object' && '_propertyMetadata' in val;
}
