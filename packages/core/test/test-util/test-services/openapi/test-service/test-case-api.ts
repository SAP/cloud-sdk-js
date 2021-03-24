/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '../../../../../src';
import type { SimpleTestEntity, ComplexTestEntity } from './schema';

export const TestCaseApi = {
  testCaseGetRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity | undefined, queryParameters: {'requiredPathItemQueryParam': string,
  'optionalQueryParam'?: string,
  'requiredQueryParam': string,
  'optionalPathItemQueryParam'?: string}) => new OpenApiRequestBuilder<any>(
    'get',
    '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}',
    {
          pathParameters: { requiredPathItemPathParam },
          body,
          queryParameters
        }
  ),
  testCasePostRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity, queryParameters: {'optionalPathItemQueryParam'?: string,
  'requiredPathItemQueryParam': string,
  'optionalQueryParam'?: string,
  'requiredQueryParam': string}) => new OpenApiRequestBuilder<any>(
    'post',
    '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}',
    {
          pathParameters: { requiredPathItemPathParam },
          body,
          queryParameters
        }
  ),
  testCaseGetDuplicateParameters: (duplicateParam: string, queryParameters: {'duplicateParam': string}) => new OpenApiRequestBuilder<any>(
    'get',
    '/test-cases/parameters/{duplicateParam}',
    {
          pathParameters: { duplicateParam },
          queryParameters
        }
  ),
  duplicateOperationId: () => new OpenApiRequestBuilder<any>(
    'get',
    '/test-cases/duplicate-operation-ids'
  ),
  duplicateOperationId1: () => new OpenApiRequestBuilder<any>(
    'patch',
    '/test-cases/duplicate-operation-ids'
  ),
  export: (const1: string, queryParameters: {'const': string}) => new OpenApiRequestBuilder<any>(
    'get',
    '/test-cases/reserved-keywords/{const1}',
    {
          pathParameters: { const1 },
          queryParameters
        }
  ),
  complexSchemas: (body: ComplexTestEntity | undefined) => new OpenApiRequestBuilder<any>(
    'get',
    '/test-cases/complex-schemas',
    {
          body
        }
  ),
  getTestCasesNoOperationId: () => new OpenApiRequestBuilder<any>(
    'get',
    '/test-cases/no-operation-id'
  ),
  duplicateOperationId2: () => new OpenApiRequestBuilder<any>(
    'put',
    '/test-cases/duplicate-operation-ids'
  ),
  duplicateOperationId3: () => new OpenApiRequestBuilder<any>(
    'post',
    '/test-cases/duplicate-operation-ids'
  )
};
