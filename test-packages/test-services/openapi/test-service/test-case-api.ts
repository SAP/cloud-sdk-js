/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { TestCaseApi } from './openapi/api';
import { SimpleTestEntity } from './openapi/model';

export const TestServiceTestCaseApi = {
  testCaseGetRequiredParameters: (args: {
    requiredPathItemQueryParam: string;
    requiredPathItemPathParam: string;
    requiredQueryParam: string;
    optionalQueryParam?: string;
    optionalPathItemQueryParam?: string;
    body?: SimpleTestEntity;
  }) =>
    new OpenApiRequestBuilder<TestCaseApi, 'testCaseGetRequiredParameters'>(
      TestCaseApi,
      'testCaseGetRequiredParameters',
      args.requiredPathItemQueryParam,
      args.requiredPathItemPathParam,
      args.requiredQueryParam,
      args.optionalQueryParam,
      args.optionalPathItemQueryParam,
      args.body
    ),
  testCasePostRequiredParameters: (args: {
    requiredPathItemQueryParam: string;
    requiredPathItemPathParam: string;
    requiredQueryParam: string;
    body: SimpleTestEntity;
    optionalPathItemQueryParam?: string;
    optionalQueryParam?: string;
  }) =>
    new OpenApiRequestBuilder<TestCaseApi, 'testCasePostRequiredParameters'>(
      TestCaseApi,
      'testCasePostRequiredParameters',
      args.requiredPathItemQueryParam,
      args.requiredPathItemPathParam,
      args.requiredQueryParam,
      args.body,
      args.optionalPathItemQueryParam,
      args.optionalQueryParam
    ),
  testCaseGetDuplicateParameters: (args: {
    duplicateParam: string;
    duplicateParam2: string;
  }) =>
    new OpenApiRequestBuilder<TestCaseApi, 'testCaseGetDuplicateParameters'>(
      TestCaseApi,
      'testCaseGetDuplicateParameters',
      args.duplicateParam,
      args.duplicateParam2
    ),
  getTestCasesNoOperationId: () =>
    new OpenApiRequestBuilder<TestCaseApi, 'getTestCasesNoOperationId'>(
      TestCaseApi,
      'getTestCasesNoOperationId'
    ),
  duplicateOperationId: () =>
    new OpenApiRequestBuilder<TestCaseApi, 'duplicateOperationId'>(
      TestCaseApi,
      'duplicateOperationId'
    ),
  duplicateOperationId2: () =>
    new OpenApiRequestBuilder<TestCaseApi, 'duplicateOperationId2'>(
      TestCaseApi,
      'duplicateOperationId2'
    ),
  duplicateOperationId3: () =>
    new OpenApiRequestBuilder<TestCaseApi, 'duplicateOperationId3'>(
      TestCaseApi,
      'duplicateOperationId3'
    ),
  duplicateOperationId1: () =>
    new OpenApiRequestBuilder<TestCaseApi, 'duplicateOperationId1'>(
      TestCaseApi,
      'duplicateOperationId1'
    )
};
