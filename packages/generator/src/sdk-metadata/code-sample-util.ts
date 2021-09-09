import { getLevenshteinClosest } from '@sap-cloud-sdk/generator-common';
import {
  VdmActionImport,
  VdmEntity,
  VdmFunctionImport,
  VdmParameter
} from '../vdm-types';

export function getODataEntity(
  serviceName: string,
  vdmEntities: VdmEntity[]
): VdmEntity {
  return getLevenshteinClosest(serviceName, vdmEntities, (x) => x.className) ||
  getShortestNameEntity(vdmEntities);
}

export function getShortestNameEntity(vdmEntities: VdmEntity[]): VdmEntity {
   // If no closest entity found, return the entity with shortest name
   return vdmEntities.sort((a, b) =>
   a.className.length < b.className.length ? -1 : 1
 )[0];
}

export function getActionFunctionImport(
  serviceName: string,
  actionFunctionImports: VdmFunctionImport[] | VdmActionImport[]
): VdmFunctionImport | VdmActionImport {
  if (actionFunctionImports.length === 1) {
    return actionFunctionImports[0];
  }

  return (
    getLevenshteinClosest(serviceName, actionFunctionImports, (x) => x.name) ||
    getFunctionWithoutParameters(actionFunctionImports) ||
    getFunctionWithMinParameters(actionFunctionImports)
  );
}

export function getFunctionWithoutParameters(
  actionFunctionImports: VdmFunctionImport[] | VdmActionImport[]
): VdmFunctionImport | VdmActionImport | undefined {
  return actionFunctionImports.find(func => func.parameters?.length === 0);
}

/**
 * Sorts and gets a function import having minimum input parameters.
 * @param actionFunctionImports - function or action imports array
 * @returns Import containing minimum input paramters
 * @hidden
 */
export function getFunctionWithMinParameters(
  actionFunctionImports: VdmFunctionImport[] | VdmActionImport[]
): VdmFunctionImport | VdmActionImport {
  const getFunctions = actionFunctionImports.filter(
    func => func.httpMethod?.toLowerCase() === 'get'
  );
  if (getFunctions.length > 0) {
    actionFunctionImports = getFunctions;
  }
  const sortedfunctions = actionFunctionImports.sort((funcA, funcB) =>
    funcA.parameters?.length < funcB.parameters?.length ? -1 : 1
  );
  return sortedfunctions[0];
}

export function getActionFunctionParams(parameters: VdmParameter[]): string {
  const paramString = parameters
    .slice(0, 2)
    .reduce(
      (cumulator, currentParam) =>
        `${cumulator}, ${currentParam.parameterName}: '${currentParam.parameterName}'`,
      ''
    );
  return `{${paramString.substring(1)}${
    parameters.length > 2 ? ', ...' : ''
  } }`;
}
