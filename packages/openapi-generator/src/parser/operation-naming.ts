import {
  partition,
  UniqueNameGenerator,
  pascalCase,
  camelCase
} from '@sap-cloud-sdk/util';
import { Method } from '../openapi-types';
import { operationNameExtension } from '../extensions';
import { OperationInfo } from './operation-info';

/**
 * Modify each operation to contain a unique `operationId`.
 * @param openApiDocument OpenAPI JSON document.
 * @returns The modified document.
 */
export function ensureUniqueOperationIds(
  operations: OperationInfo[]
): OperationInfo[] {
  const {
    uniqueOperationNames,
    operationsWithUniqueNames,
    operationsWithDuplicateNames
  } = partitionNamedOperationsToUniqueAndDuplicate(operations);

  const nameGenerator = new UniqueNameGenerator('', uniqueOperationNames);

  const renamedOperations = renameOperations(
    operationsWithDuplicateNames,
    ({ operation }) =>
      nameGenerator.generateAndSaveUniqueName(camelCase(operation.operationId!))
  );
  return [...operationsWithUniqueNames, ...renamedOperations];
}

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

/**
 * Partition operations into a list of unique names that do not need to be changed and a list of operations where the name is duplicate or subject to change and therefore potentially duplicate.
 * @param namedOperations All operations that have an operationId
 * @returns an object containing the unique operation names and operations with (potentially) duplicate names
 */
function partitionNamedOperationsToUniqueAndDuplicate(
  namedOperations: OperationInfo[]
): {
  uniqueOperationNames: string[];
  operationsWithUniqueNames: OperationInfo[];
  operationsWithDuplicateNames: OperationInfo[];
} {
  return namedOperations.reduce(
    (
      partitionedOperations: {
        uniqueOperationNames: string[];
        operationsWithUniqueNames: OperationInfo[];
        operationsWithDuplicateNames: OperationInfo[];
      },
      operationInfo
    ) => {
      if (
        partitionedOperations.uniqueOperationNames.includes(
          operationInfo.operation.operationId!
        ) ||
        camelCase(operationInfo.operation.operationId!) !==
          operationInfo.operation.operationId ||
        partitionedOperations.operationsWithDuplicateNames.find(
          duplicate =>
            duplicate.operation.operationId ===
            operationInfo.operation.operationId
        )
      ) {
        partitionedOperations.operationsWithDuplicateNames.push(operationInfo);
      } else {
        partitionedOperations.uniqueOperationNames.push(
          operationInfo.operation.operationId!
        );
        partitionedOperations.operationsWithUniqueNames.push(operationInfo);
      }
      return partitionedOperations;
    },
    {
      uniqueOperationNames: [],
      operationsWithUniqueNames: [],
      operationsWithDuplicateNames: []
    }
  );
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
