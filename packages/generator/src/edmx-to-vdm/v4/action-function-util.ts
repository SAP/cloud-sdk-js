/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { EdmxAction, EdmxFunction } from '../../edmx-parser/v4';
import { stripNamespace } from '../edmx-to-vdm-util';

export function findActionFunctionByImportName(
  actionsOrFunctions: EdmxAction[] | EdmxFunction[],
  importName: string,
  typeForMessageText: 'action' | 'function'
): EdmxAction | EdmxFunction {
  const edmxActionOrFunction = actionsOrFunctions.find(
    actionOrFunction => stripNamespace(importName) === actionOrFunction.Name
  );
  if (!edmxActionOrFunction) {
    throw Error(
      `Unable to find a ${typeForMessageText} import with name: ${importName}, in the list of given ${typeForMessageText}s: ${actionsOrFunctions
        .map(actionOrFunciton => actionOrFunciton.Name)
        .join(',')}`
    );
  }
  return edmxActionOrFunction;
}
