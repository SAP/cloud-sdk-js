import { createLogger } from '@sap-cloud-sdk/util';
import { parseOperationImports, parseOperations } from '../../edmx-parser';
import { getSwaggerDefinitionForOperation } from '../../swagger-parser';
import { transformOperationBase, parseOperationReturnType } from '../common';
import { hasUnsupportedParameterTypes } from '../edmx-to-vdm-util';
import { findOperationByImportName } from './operation-util';
import type {
  VdmComplexType,
  VdmOperation,
  VdmPartialEntity
} from '../../vdm-types';
import type { ServiceNameFormatter } from '../../service-name-formatter';
import type {
  EdmxParameter,
  ServiceMetadata,
  EdmxOperation,
  EdmxOperationImport,
  EdmxReturnType
} from '../../edmx-parser';

const logger = createLogger({
  package: 'generator',
  messageContext: 'operation'
});

const extractResponse = (response: string) => `${response}.value`;

function splitOperationsByMissingImports(
  operationImports: EdmxOperationImport[],
  operations: EdmxOperation[]
): [EdmxOperationImport[], EdmxJoinedOperation[]] {
  return operationImports.reduce<
    [EdmxOperationImport[], EdmxJoinedOperation[]]
  >(
    ([withoutOperations, withOperations], curr) => {
      const operation = findOperationByImportName(
        operations,
        curr.operationName
      );
      if (operation) {
        withOperations.push({
          Name: curr.Name,
          operationName: curr.operationName,
          Parameter: operation.Parameter,
          ReturnType: operation.ReturnType,
          IsBound: operation.IsBound.toLowerCase() === 'true',
          operationType: curr.operationType
        });
      } else {
        withoutOperations.push(curr);
      }
      return [withoutOperations, withOperations];
    },
    [[], []]
  );
}

function extractEntitySetName(type: string): string {
  const components = type.split('.');
  return components.pop()!;
}

function buildBoundOperation(
  currentOperation: EdmxJoinedOperation,
  edmxEntitySetName: string
): EdmxJoinedOperation {
  return {
    ...currentOperation,
    entitySetName: edmxEntitySetName,
    Parameter: currentOperation.Parameter.slice(1)
  };
}

function splitBoundOperationsByMissingParameters(
  operations: EdmxJoinedOperation[]
): [EdmxJoinedOperation[], EdmxJoinedOperation[]] {
  return operations.reduce<[EdmxJoinedOperation[], EdmxJoinedOperation[]]>(
    ([validOperations, operationsWithoutRequiredParameters], curr) => {
      if (!curr.Parameter.length) {
        return [
          validOperations,
          [...operationsWithoutRequiredParameters, curr]
        ];
      }

      const edmxEntitySetName = extractEntitySetName(curr.Parameter[0].Type);
      if (edmxEntitySetName) {
        return [
          [...validOperations, buildBoundOperation(curr, edmxEntitySetName)],
          operationsWithoutRequiredParameters
        ];
      }

      return [validOperations, [...operationsWithoutRequiredParameters, curr]];
    },
    [[], []]
  );
}

/**
 * @internal
 * Joins the operation and operation Import.
 * Filters out all operations which do not have a OperationImport
 * Filters out all bound operations without a parameter and extracts the entity set name from the first parameter
 * It also removes the first parameter which contains only the entity information
 */
export function filterAndTransformOperations(
  operationImports: EdmxOperationImport[],
  operations: EdmxOperation[],
  isBound: boolean
): EdmxJoinedOperation[] {
  const [withoutOperations, withOperations] = splitOperationsByMissingImports(
    operationImports,
    operations
  );

  const relevantOperations = withOperations.filter(
    operation => operation.IsBound === isBound
  );

  validateOperationImports(
    withoutOperations,
    withoutOperations[0]?.operationType
  );

  if (isBound) {
    return validateBoundOperationParameters(relevantOperations);
  }

  return relevantOperations;
}

function validateBoundOperationParameters(
  relevantOperations: EdmxJoinedOperation[]
): EdmxJoinedOperation[] {
  const [validOperations, operationsWithoutRequiredParameters] =
    splitBoundOperationsByMissingParameters(relevantOperations);

  if (operationsWithoutRequiredParameters.length) {
    logger.warn(
      `No parameter for bound operation which is needed to find the related entity. Skipping code generation: ${operationsWithoutRequiredParameters
        .map(operation => operation.operationName)
        .join(', \n')}`
    );
  }

  return validOperations;
}

function validateOperationImports(
  withoutOperation: EdmxOperationImport[],
  operationType: string
): void {
  if (withoutOperation.length) {
    logger.warn(
      `Could not find ${operationType}s referenced by the following ${operationType} imports. Skipping code generation: ${withoutOperation
        .map(
          operationImport =>
            `${operationImport.Name} => ${operationImport.operationName}`
        )
        .join(', \n')}`
    );
  }
}

/**
 * Type representing an operation where the EdmxOperationImport and EdmxOperation have been joined.
 * @internal
 */
export interface EdmxJoinedOperation {
  /**
   * @internal
   */
  Name: string;
  /**
   * @internal
   */
  operationName: string;
  /**
   * @internal
   */
  Parameter: EdmxParameter[];
  /**
   * @internal
   */
  ReturnType: EdmxReturnType | undefined;
  /**
   * @internal
   */
  operationType: 'function' | 'action';
  /**
   * @internal
   */
  IsBound: boolean;
  /**
   * @internal
   */
  entitySetName?: string;
}

/**
 * Type representing a bound operation with joined data.
 * The entitySet name was extracted by the first parameter
 * The first parameter was removed.
 * @internal
 */
export type EdmxJoinedOperationBound = EdmxJoinedOperation & {
  /**
   * @internal
   */
  IsBound: true;
  /**
   * @internal
   */
  entitySetName: string;
};

/**
 * @internal
 */
export function generateUnboundOperations(
  serviceMetadata: ServiceMetadata,
  serviceName: string,
  entities: VdmPartialEntity[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmOperation[] {
  return generateOperations(
    serviceMetadata,
    serviceName,
    entities,
    complexTypes,
    formatter
  );
}

/**
 * @internal
 */
export function generateBoundOperations(
  serviceMetadata: ServiceMetadata,
  serviceName: string,
  entities: VdmPartialEntity[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter,
  edmxBindingEntitySetName: string,
  bindingEntityClassName: string
): VdmOperation[] {
  return generateOperations(
    serviceMetadata,
    serviceName,
    entities,
    complexTypes,
    formatter,
    edmxBindingEntitySetName,
    bindingEntityClassName
  );
}

/**
 * @internal
 */
function generateOperations(
  serviceMetadata: ServiceMetadata,
  serviceName: string,
  entities: VdmPartialEntity[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter,
  edmxBindingEntitySetName?: string,
  className?: string
): VdmOperation[] {
  const operations = parseOperations(serviceMetadata.edmx.root);
  const operationImports = [
    ...parseOperationImports(serviceMetadata.edmx.root, 'function'),
    ...parseOperationImports(serviceMetadata.edmx.root, 'action')
  ];
  const joinedOperationData = filterAndTransformOperations(
    operationImports,
    operations,
    !!edmxBindingEntitySetName
  )
    .filter(
      operation =>
        !edmxBindingEntitySetName ||
        edmxBindingEntitySetName === operation.entitySetName
    )
    // TODO 1571 remove when supporting entity type as parameter
    .filter(operation => !hasUnsupportedParameterTypes(operation));

  return joinedOperationData.map(operation => {
    const httpMethod = operation.operationType === 'function' ? 'get' : 'post';
    const swaggerDefinition = getSwaggerDefinitionForOperation(
      operation.Name,
      httpMethod,
      serviceMetadata.swagger
    );

    return {
      ...transformOperationBase(
        operation,
        operation.Parameter,
        operation.operationType,
        swaggerDefinition,
        formatter,
        edmxBindingEntitySetName
      ),
      httpMethod,
      returnType: parseOperationReturnType(
        operation.ReturnType,
        entities,
        complexTypes,
        extractResponse,
        serviceName
      ),
      entityClassName: className
    };
  });
}
