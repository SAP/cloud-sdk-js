import { EdmxAction, EdmxFunction } from '../../edmx-parser/v4';
import { stripNamespace } from '../edmx-to-vdm-util';

/**
 * @internal
 */
export function findActionFunctionByImportName(
  actionsOrFunctions: EdmxAction[] | EdmxFunction[],
  importName: string
): EdmxAction | EdmxFunction | undefined {
  return actionsOrFunctions.find(
    actionOrFunction => stripNamespace(importName) === actionOrFunction.Name
  );
}
