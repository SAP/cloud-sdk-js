import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { SimpleTestEntity, ComplexTestEntity } from './schema';
/**
 * Representation of the 'TestCaseApi'.
 * This API is part of the 'TestService' service.
 */
export declare const TestCaseApi: {
  /**
   * Makes a get request to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint and returns a 'any'
   *
   * @param requiredPathItemPathParam Path parameter with the original name requiredPathItemPathParam
   * @param body Request body
   * @param queryParameters Object containing the query parameters.
   * @returns any
   */
  testCaseGetRequiredParameters: (
    requiredPathItemPathParam: string,
    body: SimpleTestEntity | undefined,
    queryParameters: {
      requiredPathItemQueryParam: string;
      optionalQueryParam?: string;
      requiredQueryParam: string;
      optionalPathItemQueryParam?: string;
    }
  ) => OpenApiRequestBuilder<any>;
  /**
   * Makes a post request to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint and returns a 'any'
   *
   * @param requiredPathItemPathParam Path parameter with the original name requiredPathItemPathParam
   * @param body Request body
   * @param queryParameters Object containing the query parameters.
   * @returns any
   */
  testCasePostRequiredParameters: (
    requiredPathItemPathParam: string,
    body: SimpleTestEntity,
    queryParameters: {
      optionalPathItemQueryParam?: string;
      requiredPathItemQueryParam: string;
      optionalQueryParam?: string;
      requiredQueryParam: string;
    }
  ) => OpenApiRequestBuilder<any>;
  /**
   * Makes a get request to the '/test-cases/parameters/{duplicateParam}' endpoint and returns a 'any'
   *
   * @param duplicateParam Path parameter with the original name duplicateParam
   * @param queryParameters Object containing the query parameters.
   * @returns any
   */
  testCaseGetDuplicateParameters: (
    duplicateParam: string,
    queryParameters: {
      duplicateParam: string;
    }
  ) => OpenApiRequestBuilder<any>;
  /**
   * Makes a get request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId: () => OpenApiRequestBuilder<any>;
  /**
   * Makes a put request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId2: () => OpenApiRequestBuilder<any>;
  /**
   * Makes a post request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId3: () => OpenApiRequestBuilder<any>;
  /**
   * Makes a patch request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId1: () => OpenApiRequestBuilder<any>;
  /**
   * Makes a get request to the '/test-cases/reserved-keywords/{const1}' endpoint and returns a 'any'
   *
   * @param const1 Path parameter with the original name const
   * @param queryParameters Object containing the query parameters.
   * @returns any
   */
  export: (
    const1: string,
    queryParameters: {
      const: string;
    }
  ) => OpenApiRequestBuilder<any>;
  /**
   * Makes a get request to the '/test-cases/complex-schemas' endpoint and returns a 'any'
   *
   * @param body Request body
   * @returns any
   */
  complexSchemas: (
    body: ComplexTestEntity | undefined
  ) => OpenApiRequestBuilder<any>;
  /**
   * Makes a get request to the '/test-cases/no-operation-id' endpoint and returns a 'any'
   *
   * @returns any
   */
  getTestCasesNoOperationId: () => OpenApiRequestBuilder<any>;
};
//# sourceMappingURL=test-case-api.d.ts.map
