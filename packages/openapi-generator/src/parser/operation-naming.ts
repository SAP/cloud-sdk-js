import {
  partition,
  UniqueNameGenerator,
  pascalCase,
  camelCase
} from '@sap-cloud-sdk/util';
import { Method } from '../openapi-types';
import { operationNameExtension } from '../extensions';
import { OperationInfo } from './operation-info';
import { OpenAPIV3 } from 'openapi-types';

/**
 * Ensure uniqueness of the operation names.
 * @param operations Original information on the operations, that are relevant for parsing.
 * @returns The original parsing information with unique operation IDs.
 */
export function ensureUniqueOperationIds(
  operations: OperationInfo[]
): OperationInfo[] {
  const {
    unique: operationsWithUniqueNames,
    duplicate: operationsWithDuplicateNames
  } = partitionNamedOperationsToUniqueAndDuplicate(operations);

  const nameGenerator = new UniqueNameGenerator(
    '',
    operationsWithUniqueNames.map(({ operation }) => operation.operationId!)
  );

  const renamedOperations = renameOperations(
    operationsWithDuplicateNames,
    ({ operation }) =>
      nameGenerator.generateAndSaveUniqueName(camelCase(operation.operationId!))
  );
  return [...operationsWithUniqueNames, ...renamedOperations];
}

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

function isDuplicateOperationName(
  uniqueOperationNames: string[],
  operationName: string
): boolean {
  return (
    // is already in unique names
    uniqueOperationNames.includes(operationName) ||
    // differs when transformed to camel case - can potentially become duplicate
    camelCase(operationName) !== operationName
  );
}

/**
 * Partition operations into an object with two lists - one conaining the operations that have unique names and one containint the operations that have duplicate or potentially duplicate names.
 * @param namedOperations Operations with an operationId.
 * @returns An object containing the unique operations, denoted by `unique` and operations with (potentially) duplicate names, denoted by `duplicate`.
 */
function partitionNamedOperationsToUniqueAndDuplicate(
  namedOperations: OperationInfo[]
): {
  unique: OperationInfo[];
  duplicate: OperationInfo[];
} {
  const unique: OperationInfo[] = [];
  const duplicate: OperationInfo[] = [];
  namedOperations.forEach(operationInfo => {
    if (
      isDuplicateOperationName(
        unique.map(op => op.operation.operationId!),
        operationInfo.operation.operationId!
      )
    ) {
      duplicate.push(operationInfo);
    } else {
      unique.push(operationInfo);
    }
  });

  return { unique, duplicate };
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
