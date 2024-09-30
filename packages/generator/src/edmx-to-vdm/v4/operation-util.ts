import { stripNamespace } from '../edmx-to-vdm-util';
import type { EdmxOperation } from '../../edmx-parser';

/**
 * @internal
 */
export function findOperationByImportName(
  operations: EdmxOperation[],
  importName: string
): EdmxOperation | undefined {
  return operations.find(({ Name }) => stripNamespace(importName) === Name);
}
