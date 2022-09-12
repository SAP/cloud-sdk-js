import { EdmTypeShared } from '../edm-types';

/**
 * Interface to represent meta information on the _propertyMetadata property of a complex type.
 */
export interface ComplexTypeNamespace<ComplexT> {
  /**
   * Metadata like `Edm.Type` of the complex type properties.
   */
  _propertyMetadata: PropertyMetadata<ComplexT>[];
}

/**
 * Interface to represent meta information on a property of a complex type.
 */
export interface PropertyMetadata<ComplexT = any> {
  /**
   * Name of the complex type property.
   */
  name: keyof ComplexT;
  /**
   * Original name of the complex type property.
   */
  originalName: string;
  /**
   * Type of the complex type property.
   */
  type: EdmTypeShared<'any'> | ComplexTypeNamespace<any>;
  /**
   * If true, the property is a collection property.
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
