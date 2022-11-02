import { getLevenshteinClosest } from '@sap-cloud-sdk/generator-common/internal';
import { VdmEntity, VdmOperation, VdmParameter } from '../vdm-types';

/**
 * @internal
 */
export function getODataEntity(
  serviceName: string,
  vdmEntities: VdmEntity[]
): VdmEntity {
  return (
    getLevenshteinClosest(serviceName, vdmEntities, x => x.className) ||
    getShortestNameEntity(vdmEntities)
  );
}
/**
 * @internal
 */
export function getShortestNameEntity(vdmEntities: VdmEntity[]): VdmEntity {
  // If no closest entity found, return the entity with shortest name
  return vdmEntities.sort((a, b) =>
    a.className.length < b.className.length ? -1 : 1
  )[0];
}
/**
 * @internal
 */
export function sampleOperationImport(
  serviceName: string,
  operationImports: VdmOperation[]
): VdmOperation {
  if (operationImports.length === 1) {
    return operationImports[0];
  }

  return (
    getLevenshteinClosest(serviceName, operationImports, x => x.name) ||
    getOperationWithoutParameters(operationImports) ||
    getOperationWithMinParameters(operationImports)
  );
}
/**
 * @internal
 */
export function getOperationWithoutParameters(
  operationImports: VdmOperation[]
): VdmOperation | undefined {
  return operationImports.find(func => func.parameters?.length === 0);
}

/**
 * Sorts and gets a function or action import having minimum input parameters.
 * @param operationImports - function or action imports array
 * @returns Function or action containing minimum input parameters
 * @internal
 */
export function getOperationWithMinParameters(
  operationImports: VdmOperation[]
): VdmOperation {
  const getOperations = operationImports.filter(
    func => func.httpMethod?.toLowerCase() === 'get'
  );
  if (getOperations.length) {
    operationImports = getOperations;
  }
  const sortedOperations = operationImports.sort((funcA, funcB) =>
    funcA.parameters?.length < funcB.parameters?.length ? -1 : 1
  );
  return sortedOperations[0];
}
/**
 * @internal
 */
export function getOperationParams(parameters: VdmParameter[]): string {
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
