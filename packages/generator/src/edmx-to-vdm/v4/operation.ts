import { createLogger } from '@sap-cloud-sdk/util';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { transformOperationBase } from '../common/operation';
import { parseOperationReturnType } from '../common/operation-return-type';
import { getSwaggerDefinitionForOperation } from '../../swagger-parser/swagger-parser';
import {
  EdmxOperation,
  EdmxOperationImport,
  EdmxReturnType
} from '../../edmx-parser/v4/edm-types';
import {
  EdmxParameter,
  parseOperationImports,
  parseOperations
} from '../../edmx-parser';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import {
  VdmComplexType,
  VdmEntityInConstruction,
  VdmOperation
} from '../../vdm-types';
import { hasUnsupportedParameterTypes } from '../edmx-to-vdm-util';
import { findOperationByImportName as findOperationByImportName } from './operation-util';

const logger = createLogger({
  package: 'generator',
  messageContext: 'operation'
});

const extractResponse = (response: string) => `${response}.value`;

function splitMissingOperation(
  operationImports: EdmxOperationImport[],
  operations: EdmxOperation[]
): [EdmxOperationImport[], EdmxJoinedOperation[]] {
  return operationImports.reduce<
    [EdmxOperationImport[], EdmxJoinedOperation[]]
  >(
    ([withoutOperation, withOperation], curr) => {
      const operation = findOperationByImportName(
        operations,
        curr.operationName
      );
      if (operation) {
        withOperation.push({
          Name: curr.Name,
          operationName: curr.operationName,
          Parameter: operation.Parameter,
          ReturnType: operation.ReturnType,
          IsBound: operation.IsBound,
          operationType: curr.operationType
        });
      } else {
        withoutOperation.push(curr);
      }
      return [withoutOperation, withOperation];
    },
    [[], []]
  );
}

function splitMissingParameter(
  operations: EdmxJoinedOperation[]
): [EdmxJoinedOperation[], EdmxJoinedOperation[]] {
  return operations.reduce<[EdmxJoinedOperation[], EdmxJoinedOperation[]]>(
    ([validOperations, withoutParameter], curr) => {
      if (!curr.IsBound) {
        return [[...validOperations, curr], withoutParameter];
      }

      if (!curr.Parameter.length) {
        return [validOperations, [...withoutParameter, curr]];
      }

      const entitySetName = curr.Parameter[0].Type.split('.')[1];
      if (entitySetName) {
        const bound = {
          ...curr,
          entitySetName,
          Parameter: curr.Parameter.slice(1)
        };
        return [[...validOperations, bound], withoutParameter];
      }

      return [validOperations, [...withoutParameter, curr]];
    },
    [[], []]
  );
}

/**
 * @internal
 * Joins the operation and operation Import.
 * Filters out all operations which do not have a OperationImport
 * Filters out all bound operations without a parameter and extracts the entityset name from the frist parameter
 * It also removes the first parameter which contains only the entity information
 */
export function filterAndTransformOperations(
  operationImports: EdmxOperationImport[],
  operations: EdmxOperation[],
  isBound: boolean
): EdmxJoinedOperation[] {
  const filteredByBoundOperations = operations.filter(
    operation => operation.IsBound === isBound
  );

  const [withoutOperation, withOperation] = splitMissingOperation(
    operationImports,
    filteredByBoundOperations
  );

  const [validOperations, withoutParameter] =
    splitMissingParameter(withOperation);

  if (withoutParameter.length) {
    logger.warn(
      `No parameter for bound operation which is needed to find the related entity. Skipping code generation: ${withoutParameter
        .map(operation => operation.operationName)
        .join(', \n')}`
    );
  }

  if (withoutOperation.length) {
    const operationType = withoutOperation[0].operationType;

    logger.warn(
      `Could not find ${operationType}s referenced by the following ${operationType} imports. Skipping code generation: ${withoutOperation
        .map(
          operationImport =>
            `${operationImport.Name} => ${operationImport.operationName}`
        )
        .join(', \n')}`
    );
  }

  return validOperations;
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

function isBoundOperation(
  operation: EdmxJoinedOperation | EdmxJoinedOperationBound
): operation is EdmxJoinedOperationBound {
  return operation.IsBound;
}

/**
 * @internal
 */
export function generateUnboundOperations(
  serviceMetadata: ServiceMetadata,
  serviceName: string,
  operationType: 'function' | 'action',
  entities: VdmEntityInConstruction[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmOperation[] {
  return generateOperations(
    serviceMetadata,
    serviceName,
    operationType,
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
  operationType: 'function' | 'action',
  entities: VdmEntityInConstruction[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter,
  bindingEntitySetName: string
): VdmOperation[] {
  return generateOperations(
    serviceMetadata,
    serviceName,
    operationType,
    entities,
    complexTypes,
    formatter,
    bindingEntitySetName
  );
}

/**
 * @internal
 */
function generateOperations(
  serviceMetadata: ServiceMetadata,
  serviceName: string,
  operationType: 'function' | 'action',
  entities: VdmEntityInConstruction[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter,
  bindingEntitySetName?: string
): VdmOperation[] {
  const operations = parseOperations(serviceMetadata.edmx.root, operationType);
  const operationImports = parseOperationImports(
    serviceMetadata.edmx.root,
    operationType
  );
  const joinedOperationData = filterAndTransformOperations(
    operationImports,
    operations,
    !!bindingEntitySetName
  )
    .filter(
      operation =>
        !bindingEntitySetName ||
        bindingEntitySetName === operation.operationName
    )
    // TODO 1571 remove when supporting entity type as parameter
    .filter(operation => !hasUnsupportedParameterTypes(operation));

  return joinedOperationData.map(operation => {
    const httpMethod = operationType === 'function' ? 'get' : 'post';
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
        bindingEntitySetName
      ),
      httpMethod,
      returnType: parseOperationReturnType(
        operation.ReturnType,
        entities,
        complexTypes,
        extractResponse,
        serviceName
      )
    };
  });
}
