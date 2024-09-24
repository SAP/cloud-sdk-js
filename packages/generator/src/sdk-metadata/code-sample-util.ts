import { getLevenshteinClosest } from '@sap-cloud-sdk/generator-common/internal';
import type { VdmEntity, VdmOperation, VdmParameter } from '../vdm-types';

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
export function sampleOperation(
  serviceName: string,
  operations: VdmOperation[]
): VdmOperation {
  if (operations.length === 1) {
    return operations[0];
  }

  return (
    getLevenshteinClosest(serviceName, operations, x => x.name) ||
    getOperationWithoutParameters(operations) ||
    getOperationWithMinParameters(operations)
  );
}
/**
 * @internal
 */
export function getOperationWithoutParameters(
  operations: VdmOperation[]
): VdmOperation | undefined {
  return operations.find(func => func.parameters?.length === 0);
}

/**
 * Sorts and gets a function or action import having minimum input parameters.
 * @param operations - function or action imports array
 * @returns Function or action containing minimum input parameters
 * @internal
 */
export function getOperationWithMinParameters(
  operations: VdmOperation[]
): VdmOperation {
  const getOperations = operations.filter(
    func => func.httpMethod?.toLowerCase() === 'get'
  );
  if (getOperations.length) {
    operations = getOperations;
  }
  const sortedOperations = operations.sort((funcA, funcB) =>
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
