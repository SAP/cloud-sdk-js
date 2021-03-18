import { OpenAPIV3 } from 'openapi-types';
import { $Refs } from '@apidevtools/swagger-parser';
import { isReferenceObject } from '../model';

/**
 * Check whether the given object is a reference object and resolve if necessary.
 * This operates only on the current level and does not resolve the object recursively.
 * @param obj Object to resolve if necessary.
 * @param refs References to resolve by.
 * @returns A resolved object.
 */
export function resolveObject<T>(
  obj: T | OpenAPIV3.ReferenceObject,
  refs: $Refs
): T {
  return isReferenceObject(obj) ? refs.get(obj.$ref) : obj;
}
