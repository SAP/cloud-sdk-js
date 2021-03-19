import {
  partition,
  UniqueNameGenerator,
  pascalCase,
  camelCase
} from '@sap-cloud-sdk/util';
import { Method } from '../openapi-types';
import { operationNameExtension } from './extensions';
import { OperationInfo, getOperation } from './operation-info';

/**
 * Modify each operation to contain a unique `operationId`.
 * @param openApiDocument OpenAPI JSON document.
 * @returns The modified document.
 */
export function ensureUniqueOperationIds(
  operations: OperationInfo[]
): OperationInfo[] {
  const [operationsWithExtensions, operationsWithoutExtensions] = partition(
    operations,
    operationInfo => !!getOperation(operationInfo)[operationNameExtension]
  );

  const renamedOperationsWithExtensions = renameOperations(
    operationsWithExtensions,
    operationInfo => getOperation(operationInfo)[operationNameExtension]
  );

  const [namedOperations, unnamedOperations] = partition(
    operationsWithoutExtensions,
    operationInfo => !!getOperation(operationInfo).operationId
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
    operationInfo =>
      nameGenerator.generateAndSaveUniqueName(
        camelCase(getOperation(operationInfo).operationId!)
      )
  );
  return [...operationsWithUniqueNames, ...renamedOperations];
}

function renameOperations(
  operationInfoList: OperationInfo[],
  renameFn: (operationInfo: OperationInfo) => string
): OperationInfo[] {
  return operationInfoList.map(operationInfo => {
    getOperation(operationInfo).operationId = renameFn(operationInfo);
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
      const operation = getOperation(operationInfo);
      if (
        partitionedOperations.uniqueOperationNames.includes(
          operation.operationId!
        ) ||
        camelCase(operation.operationId!) !== operation.operationId ||
        partitionedOperations.operationsWithDuplicateNames.find(
          duplicate =>
            getOperation(duplicate).operationId === operation.operationId
        )
      ) {
        partitionedOperations.operationsWithDuplicateNames.push(operationInfo);
      } else {
        partitionedOperations.uniqueOperationNames.push(operation.operationId!);
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
