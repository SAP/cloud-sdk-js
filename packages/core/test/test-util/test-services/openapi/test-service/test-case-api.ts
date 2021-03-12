/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '../../../../../src';
import { SimpleTestEntity, ComplexTestEntity } from './model';

export const TestServiceTestCaseApi = {
  testCaseGetRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity, queryParameters: {'requiredPathItemQueryParam': string,
  'optionalQueryParam'?: string,
  'requiredQueryParam': string,
  'optionalPathItemQueryParam'?: string}) => new OpenApiRequestBuilder(
    'get',
    '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}',
    {
          pathParameters: [requiredPathItemPathParam],
          body,
          queryParameters
        }
  ),
  testCasePostRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity | undefined, queryParameters: {'optionalPathItemQueryParam'?: string,
  'requiredPathItemQueryParam': string,
  'optionalQueryParam'?: string,
  'requiredQueryParam': string}) => new OpenApiRequestBuilder(
    'post',
    '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}',
    {
          pathParameters: [requiredPathItemPathParam],
          body,
          queryParameters
        }
  ),
  testCaseGetDuplicateParameters: (duplicateParam: string, queryParameters: {'duplicateParam': string}) => new OpenApiRequestBuilder(
    'get',
    '/test-cases/parameters/{duplicateParam}',
    {
          pathParameters: [duplicateParam],
          queryParameters
        }
  ),
  getTestCasesNoOperationId: (queryParameters?: {}) => new OpenApiRequestBuilder(
    'get',
    '/test-cases/no-operation-id',
    
  ),
  duplicateOperationId: (queryParameters?: {}) => new OpenApiRequestBuilder(
    'get',
    '/test-cases/duplicate-operation-ids',
    
  ),
  duplicateOperationId2: (queryParameters?: {}) => new OpenApiRequestBuilder(
    'put',
    '/test-cases/duplicate-operation-ids',
    
  ),
  duplicateOperationId3: (queryParameters?: {}) => new OpenApiRequestBuilder(
    'post',
    '/test-cases/duplicate-operation-ids',
    
  ),
  duplicateOperationId1: (queryParameters?: {}) => new OpenApiRequestBuilder(
    'patch',
    '/test-cases/duplicate-operation-ids',
    
  ),
  complexSchemas: (body: ComplexTestEntity, queryParameters?: {}) => new OpenApiRequestBuilder(
    'get',
    '/test-cases/complex-schemas',
    {
          body
        }
  )
};
