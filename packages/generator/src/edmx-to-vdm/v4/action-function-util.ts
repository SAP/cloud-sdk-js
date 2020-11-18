import { createLogger } from '@sap-cloud-sdk/util';
import { EdmxAction, EdmxFunction } from '../../edmx-parser/v4';
import { stripNamespace } from '../edmx-to-vdm-util';
const logger = createLogger({
  package: 'generator',
  messageContext: 'action-function-util'
});

export function findActionFunctionByImportName(
  actionsOrFunctions: EdmxAction[] | EdmxFunction[],
  importName: string,
  typeForMessageText: 'action' | 'function'
): EdmxAction | EdmxFunction | undefined {
  const edmxActionOrFunction = actionsOrFunctions.find(
    actionOrFunction => stripNamespace(importName) === actionOrFunction.Name
  );
  if (!edmxActionOrFunction) {
    logger.warn(
      `Unable to find a ${typeForMessageText} import with name: ${importName}, in the list of given ${typeForMessageText}s: ${actionsOrFunctions
        .map(actionOrFunciton => actionOrFunciton.Name)
        .join(',')}`
    );
  }
  return edmxActionOrFunction;
}
