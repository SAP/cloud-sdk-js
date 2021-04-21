import { partition, pascalCase, camelCase } from '@sap-cloud-sdk/util';
import { Method } from '../openapi-types';
import { operationNameExtension } from '../extensions';
import { OperationInfo } from './parsing-info';

/**
 * Give all given operations an initial name.
 * All operations with an extension will be renamed.
 * Operations that don't have a name thereafter, will be named based on their method and path pattern.
 * @param operations Original information on the operations, that are relevant for parsing.
 * @returns Operation information, where every operation has an operationId.
 */
export function nameOperations(operations: OperationInfo[]): OperationInfo[] {
  const [operationsWithExtensions, operationsWithoutExtensions] = partition(
    operations,
    ({ operation }) => !!operation[operationNameExtension]
  );

  validateUniqueExtensions(operationsWithExtensions);

  const renamedOperationsWithExtensions = renameOperations(
    operationsWithExtensions,
    renameOperationWithExtension
  );

  const [namedOperations, unnamedOperations] = partition(
    operationsWithoutExtensions,
    ({ operation }) => !!operation.operationId
  );

  const renamedUnnamedOperations = renameOperations(
    unnamedOperations,
    ({ pathPattern, method }) =>
      getOperationNameFromPatternAndMethod(pathPattern, method)
  );

  return [
    ...renamedOperationsWithExtensions,
    ...namedOperations,
    ...renamedUnnamedOperations
  ];
}

function validateUniqueExtensions(operations: OperationInfo[]): void {
  operations.reduce((uniqueOperationNames: string[], operationInfo) => {
    const operationName = renameOperationWithExtension(operationInfo);
    if (uniqueOperationNames.includes(operationName)) {
      throw new Error(
        `Operation name '${operationInfo.operation[operationNameExtension]}' provided for '${operationNameExtension}' resolves to '${operationName}' and is not unique.`
      );
    }
    return [...uniqueOperationNames, operationName];
  }, []);
}

function renameOperationWithExtension({ operation }: OperationInfo): string {
  const originalOperationName = operation[operationNameExtension];
  if (!originalOperationName) {
    // This should never happen
    throw new Error(
      'Could not rename operation based on extension. Extension is not defined.'
    );
  }
  return camelCase(originalOperationName);
}

function renameOperations(
  operations: OperationInfo[],
  renameFn: (operationInfo: OperationInfo) => string
): OperationInfo[] {
  return operations.map(operationInfo => {
    operationInfo.operation.operationId = renameFn(operationInfo);
    return operationInfo;
  });
}

export function getOperationNameFromPatternAndMethod(
  pattern: string,
  method: Method
): string {
  const [placeholders, pathParts] = partition(pattern.split('/'), part =>
    /^\{.+\}$/.test(part)
  );
  const prefix = getSpeakingNameForMethod(method).toLowerCase();
  const base = pathParts.map(part => pascalCase(part)).join('');
  const suffix = placeholders.length
    ? 'By' + placeholders.map(part => pascalCase(part)).join('And')
    : '';

  return prefix + base + suffix;
}

function getSpeakingNameForMethod(method: Method): string {
  return nameMapping[method];
}

const nameMapping = {
  get: 'get',
  post: 'create',
  patch: 'update',
  put: 'update',
  delete: 'delete',
  head: 'getHeadersFor',
  options: 'getOptionsFor',
  trace: 'trace'
} as const;
