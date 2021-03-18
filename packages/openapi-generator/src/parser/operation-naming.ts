import {
  partition,
  UniqueNameGenerator,
  pascalCase,
  camelCase
} from '@sap-cloud-sdk/util';
import { OpenApiOperation } from '../openapi-types';
import { operationNameExtension } from './extensions';

/**
 * Modify each operation to contain a unique `operationId`.
 * @param openApiDocument OpenAPI JSON document.
 * @returns The modified document.
 */
export function ensureUniqueOperationIds(
  operations: OpenApiOperation[]
): OpenApiOperation[] {
  const [operationsWithExtensions, operationsWithoutExtensions] = partition(
    operations,
    operation => !!operation[operationNameExtension]
  );

  const renamedOperationsWithExtensions = renameOperations(
    operationsWithExtensions,
    operation => operation[operationNameExtension]
  );

  const [namedOperations, unnamedOperations] = partition(
    operationsWithoutExtensions,
    ({ operationId }) => !!operationId
  );

  const renamedUnnamedOperations = renameOperations(
    unnamedOperations,
    ({ pathPattern, method }) =>
      getOperationNameFromPatternAndMethod(pathPattern, method)
  );

  const {
    uniqueOperationNames,
    operationsWithUniqueNames,
    operationsWithDuplicateNames
  } = partitionNamedOperationsToUniqueAndDuplicate([
    ...renamedOperationsWithExtensions,
    ...namedOperations
  ]);

  const nameGenerator = new UniqueNameGenerator('', uniqueOperationNames);

  const renamedOperations = renameOperations(
    [...operationsWithDuplicateNames, ...renamedUnnamedOperations],
    ({ operationId }) =>
      nameGenerator.generateAndSaveUniqueName(camelCase(operationId!))
  );
  return [...operationsWithUniqueNames, ...renamedOperations];
}

function renameOperations(
  operations: OpenApiOperation[],
  renameFn: (op: OpenApiOperation) => string
): OpenApiOperation[] {
  return operations.map(operation => {
    operation.operationId = renameFn(operation);
    return operation;
  });
}

/**
 * Partition operations into a list of unique names that do not need to be changed and a list of operations where the name is duplicate or subject to change and therefore potentially duplicate.
 * @param namedOperations All operations that have an operationId
 * @returns an object containing the unique operation names and operations with (potentially) duplicate names
 */
function partitionNamedOperationsToUniqueAndDuplicate(
  namedOperations: OpenApiOperation[]
): {
  uniqueOperationNames: string[];
  operationsWithUniqueNames: OpenApiOperation[];
  operationsWithDuplicateNames: OpenApiOperation[];
} {
  return namedOperations.reduce(
    (
      partitionedOperations: {
        uniqueOperationNames: string[];
        operationsWithUniqueNames: OpenApiOperation[];
        operationsWithDuplicateNames: OpenApiOperation[];
      },
      operation
    ) => {
      if (
        partitionedOperations.uniqueOperationNames.includes(
          operation.operationId!
        ) ||
        camelCase(operation.operationId!) !== operation.operationId ||
        partitionedOperations.operationsWithDuplicateNames.find(
          duplicate => duplicate.operationId === operation.operationId
        )
      ) {
        partitionedOperations.operationsWithDuplicateNames.push(operation);
      } else {
        partitionedOperations.uniqueOperationNames.push(operation.operationId!);
        partitionedOperations.operationsWithUniqueNames.push(operation);
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
  method: string
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

function getSpeakingNameForMethod(method: string): string {
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
