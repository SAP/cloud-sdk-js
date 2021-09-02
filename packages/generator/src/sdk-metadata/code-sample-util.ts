import levenstein from 'fast-levenshtein';
import {
  VdmActionImport,
  VdmEntity,
  VdmFunctionImport,
  VdmParameter
} from '../vdm-types';

const distanceThreshold = 5;

export function getODataEntity(
  serviceName: string,
  vdmEntities: VdmEntity[]
): VdmEntity {
  let closestEntity: VdmEntity | undefined;
  let minDistance = distanceThreshold;

  // remove special char from service name
  const serviceNameFormatted = getWordWithoutSpecialChars(serviceName);
  vdmEntities.forEach(entity => {
    const distance = getLevensteinDistance(
      serviceNameFormatted,
      getWordWithoutSpecialChars(entity.className)
    );
    if (distance <= minDistance) {
      minDistance = distance;
      closestEntity = entity;
    }
  });

  if (closestEntity) {
    return closestEntity!;
  }
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
    getLevensteinClosestFunction(serviceName, actionFunctionImports) ||
    getFunctionWithoutParameters(actionFunctionImports) ||
    getFunctionWithMinParameters(actionFunctionImports)
  );
}

/**
 * Gets function having minimum Levenstein distance with the service name. Returns undefined if distance is greater than threshhold.
 * @param serviceName - Name of service
 * @param actionFunctionImports - function or action imports array
 * @returns Import with least levenshtein dist or undefined if no matching import found
 * @hidden
 */
export function getLevensteinClosestFunction(
  serviceName: string,
  actionFunctionImports: VdmFunctionImport[] | VdmActionImport[]
): VdmFunctionImport | VdmActionImport | undefined {
  let closestFunc: VdmFunctionImport | VdmActionImport | undefined;
  let minDistance = distanceThreshold;
  actionFunctionImports.forEach(func => {
    const distance = getLevensteinDistance(
      getWordWithoutSpecialChars(serviceName),
      getWordWithoutSpecialChars(func.name)
    );
    if (distance <= minDistance) {
      minDistance = distance;
      closestFunc = func;
    }
  });

  return closestFunc;
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
  const paramString = Object.entries(parameters || [])
    .slice(0, 2)
    .reduce(
      (cumulator, currentParam) =>
        `${cumulator}, ${currentParam[1].parameterName}: '${currentParam[1].parameterName}'`,
      ''
    );
  return `{${paramString.substring(1)}${
    parameters.length > 2 ? ', ...' : ''
  } }`;
}

/**
 * Calculate levenshtein distance of the two strings.
 * @param stringA - The first string.
 * @param stringB - The second string.
 * @returns The levenshtein distance (0 and above).
 * @hidden
 */
function getLevensteinDistance(stringA: string, stringB: string): number {
  return levenstein.get(stringA.toLowerCase(), stringB.toLowerCase());
}

function getWordWithoutSpecialChars(text: string): string {
  return text.replace('_', '');
}
