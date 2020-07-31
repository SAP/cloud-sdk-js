/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  EdmxAction,
  EdmxActionImport,
  EdmxFunction,
  EdmxFunctionImport
} from '../../edmx-parser/v4';
import { stripNamespace } from '../edmx-to-vdm-util';

export function findFunctionForFunctionImport(
  functions: EdmxFunction[],
  functionImport: EdmxFunctionImport
): EdmxFunction {
  const edmxActionOrFunction = functions.find(
    fn => stripNamespace(functionImport.Function) === fn.Name
  );
  if (!edmxActionOrFunction) {
    throw Error(
      `Unable to find a function with name: ${functionImport.Function}, but specified in function import ${functionImport.Name}`
    );
  }
  return edmxActionOrFunction;
}

export function findActionForActionImport(
  actions: EdmxAction[],
  actionImport: EdmxActionImport
): EdmxAction {
  const edmxActionOrFunction = actions.find(
    action => stripNamespace(actionImport.Action) === action.Name
  );
  if (!edmxActionOrFunction) {
    throw Error(
      `Unable to find a action with name: ${actionImport.Action}, but specified in action import ${actionImport.Name}`
    );
  }
  return edmxActionOrFunction;
}
