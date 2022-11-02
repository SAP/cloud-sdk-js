import { EdmxOperation } from '../../edmx-parser/v4/edm-types';
import { stripNamespace } from '../edmx-to-vdm-util';

/**
 * @internal
 */
export function findOperationByImportName(
  operations: EdmxOperation[],
  importName: string
): EdmxOperation | undefined {
  return operations.find(({ Name }) => stripNamespace(importName) === Name);
}
