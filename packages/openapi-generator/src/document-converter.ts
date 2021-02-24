import { promises } from 'fs';
import { parse } from 'path';
import { OpenAPIV3 } from 'openapi-types';
import { convert } from 'swagger2openapi';
import { load } from 'js-yaml';
import {
  camelCase,
  ErrorWithCause,
  partition,
  pascalCase,
  UniqueNameGenerator
} from '@sap-cloud-sdk/util';
import { Method, methods } from './openapi-types';
const { readFile } = promises;

/**
 * Convert an OpenAPI document to ensure smooth parsing and generation thereafter.
 * Documents are expected to be formatted as JSON and compliant with OpenAPI version 3.
 * @param filePath File content of the original spec.
 */
export async function convertOpenApiSpec(
  filePath: string
): Promise<OpenAPIV3.Document> {
  const file = await parseFileAsJson(filePath);
  const openApiDocument = await convertDocToOpenApiV3(file);
  return convertDocWithDefaultTag(
    convertDocToUniqueOperationIds(openApiDocument)
  );
}

/**
 * Parse a JSON or YAML file and return it as JSON.
 * @param filePath Path to the file
 * @returns JSON representation of the given file.
 */
export async function parseFileAsJson(
  filePath: string
): Promise<Record<string, any>> {
  const fileContent = await readFile(filePath, 'utf8');
  const extension = parse(filePath).ext.toLowerCase();
  if (extension === '.json') {
    return JSON.parse(fileContent);
  }
  if (['.yaml', '.yml'].includes(extension)) {
    return load(fileContent) as Record<string, any>;
  }

  throw new Error(
    `Could not parse OpenAPI specification at ${filePath}. Only JSON and YAML files are allowed.`
  );
}

/**
 * Convert Swagger documents to OpenAPI documents.
 * If an OpenAPI document is passed it is not modified.
 * @param openApiDocument OpenAPI version 2 (Swagger) or 3 document to be converted to version 3.
 * @returns A promise of an OpenAPI version 3 document.
 */
export async function convertDocToOpenApiV3(
  openApiDocument: Record<string, any>
): Promise<OpenAPIV3.Document> {
  // This is a hidden cast to OpenAPIV3.Document
  try {
    return (await convert(openApiDocument, {})).openapi;
  } catch (err) {
    throw new ErrorWithCause(
      'Could not convert OpenAPI specification to OpenAPI version 3.',
      err
    );
  }
}

/**
 * Modify spec to contain the 'default' tag when no tags are defined.
 * @param openApiDocument OpenAPI JSON document.
 * @returns The modified document.
 */
export function convertDocWithDefaultTag(
  openApiDocument: OpenAPIV3.Document
): OpenAPIV3.Document {
  const tag = 'default';

  executeForAllOperationObjects(openApiDocument, operation => {
    operation.tags = addGlobalTagToOperationWhenNoTagsAreUsed(
      operation.tags,
      tag
    );
  });

  const detectGlobalTag = !!Object.entries(
    openApiDocument.paths
  ).find(([, pathDefinition]: [string, OpenAPIV3.PathItemObject]) =>
    hasTag(pathDefinition, tag)
  );

  if (detectGlobalTag) {
    openApiDocument.tags = addGlobalTagToRootTags(openApiDocument.tags, tag);
  }

  return openApiDocument;
}

function hasTag(
  pathDefinition: OpenAPIV3.PathItemObject,
  tag: string
): boolean {
  return !!methods.find(method => pathDefinition[method]?.tags!.includes(tag));
}

function addGlobalTagToRootTags(
  tags: OpenAPIV3.TagObject[] | undefined,
  globalTag: string
): OpenAPIV3.TagObject[] {
  return tags?.find(tag => tag.name === globalTag)
    ? tags
    : tags?.length
    ? tags.concat({ name: globalTag })
    : [{ name: globalTag }];
}

function addGlobalTagToOperationWhenNoTagsAreUsed(
  tags: string[] | undefined,
  globalTag: string
): string[] {
  return tags?.length ? tags : [globalTag];
}

/**
 * Modify each operation to contain a unique `operationId`.
 * @param openApiDocument OpenAPI JSON document.
 * @returns The modified document.
 */
export function convertDocToUniqueOperationIds(
  openApiDocument: OpenAPIV3.Document
): OpenAPIV3.Document {
  const {
    namedOperations,
    unnamedOperationsWithAdditionalInfo
  } = partitionOperationsToNamedAndUnnamed(openApiDocument);

  const {
    uniqueOperationNames,
    operationsWithDuplicateNames
  } = partitionNamedOperationsToUniqueAndDuplicate(namedOperations);

  // TODO: The name generator only uses '' as a separator to comply with the underlying OpenAPI generator. Change back to '_' once the generator is not used anymore.
  const nameGenerator = new UniqueNameGenerator('', uniqueOperationNames);

  operationsWithDuplicateNames.forEach(operation => {
    setUniqueOperationName(operation, operation.operationId!, nameGenerator);
  });

  unnamedOperationsWithAdditionalInfo.forEach(
    ({ operation, pathPattern, method }) => {
      setUniqueOperationName(
        operation,
        getOperationNameFromPatternAndMethod(pathPattern, method),
        nameGenerator
      );
    }
  );

  return openApiDocument;
}

interface OperationWithAdditionalInfo {
  operation: OpenAPIV3.OperationObject;
  pathPattern: string;
  method: Method;
}

/**
 * Partition operations into a list of unique names that do not need to be changed and a list of operations where the name is duplicate or subject to change and therefore potentially duplicate.
 * @param namedOperations All operations that have an operationId
 * @returns an object containing the unique operation names and operations with (potentially) duplicate names
 */
function partitionNamedOperationsToUniqueAndDuplicate(
  namedOperations: OpenAPIV3.OperationObject[]
): {
  uniqueOperationNames: string[];
  operationsWithDuplicateNames: OpenAPIV3.OperationObject[];
} {
  return namedOperations.reduce(
    (
      partitionedOperations: {
        uniqueOperationNames: string[];
        operationsWithDuplicateNames: OpenAPIV3.OperationObject[];
      },
      operation
    ) => {
      if (
        partitionedOperations.uniqueOperationNames.includes(
          operation.operationId!
        ) ||
        // TODO: The checks below are only necessary to comply with the underlying OpenAPI generator. Remove once the generator is not used anymore.
        camelCase(operation.operationId!) !== operation.operationId ||
        partitionedOperations.operationsWithDuplicateNames.find(
          duplicateOperation =>
            duplicateOperation.operationId === operation.operationId
        )
      ) {
        partitionedOperations.operationsWithDuplicateNames.push(operation);
      } else {
        partitionedOperations.uniqueOperationNames.push(operation.operationId!);
      }
      return partitionedOperations;
    },
    { uniqueOperationNames: [], operationsWithDuplicateNames: [] }
  );
}

function partitionOperationsToNamedAndUnnamed(
  openApiDocument: OpenAPIV3.Document
): {
  namedOperations: OpenAPIV3.OperationObject[];
  unnamedOperationsWithAdditionalInfo: OperationWithAdditionalInfo[];
} {
  const namedOperations: OpenAPIV3.OperationObject[] = [];
  const unnamedOperationsWithAdditionalInfo: OperationWithAdditionalInfo[] = [];
  executeForAllOperationObjects(
    openApiDocument,
    (operation, pathPattern, method) => {
      if (operation.operationId) {
        namedOperations.push(operation);
      } else {
        unnamedOperationsWithAdditionalInfo.push({
          operation,
          pathPattern,
          method
        });
      }
    }
  );

  return {
    namedOperations,
    unnamedOperationsWithAdditionalInfo
  };
}

function setUniqueOperationName(
  operation: OpenAPIV3.OperationObject,
  name: string,
  nameGenerator: UniqueNameGenerator
) {
  // TODO: The transformation to camel case only exists to comply with the underlying OpenAPI generator. Remove once the generator is not used anymore.
  operation.operationId = nameGenerator.generateAndSaveUniqueName(
    camelCase(name)
  );
}

function executeForAllOperationObjects(
  openApiDocument: OpenAPIV3.Document,
  callback: (
    operation: OpenAPIV3.OperationObject,
    path: string,
    method: Method
  ) => any
): void {
  return Object.entries(openApiDocument.paths).forEach(
    ([path, pathDefinition]: [string, OpenAPIV3.PathItemObject]) => {
      methods.forEach(method => {
        if (pathDefinition[method]) {
          callback(pathDefinition[method]!, path, method);
        }
      });
    }
  );
}

export function getOperationNameFromPatternAndMethod(
  pattern: string,
  method: Method
): string {
  const [placeholders, pathParts] = partition(pattern.split('/'), part =>
    /^\{.*\}$/.test(part)
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
