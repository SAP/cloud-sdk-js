/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '../../../../../src';
import { DefaultApi } from './openapi/api';
import { TestEntity, SimpleTestEntity } from './openapi/model';

export const TestServiceApi = {
  getAllEntities: (args?: {
    stringParameter?: string,
    integerParameter?: number,
    dollarParameter?: string,
    dotParameter?: string,
    enumStringParameter?: 'value1' | 'value2',
    enumInt32Parameter?: 1 | 2,
    enumDoubleParameter?: 1 | 2,
    enumBooleanParameter?: boolean
  }) => new OpenApiRequestBuilder<DefaultApi, 'getAllEntities'>(
    DefaultApi,
    'getAllEntities',
    args?.stringParameter,
    args?.integerParameter,
    args?.dollarParameter,
    args?.dotParameter,
    args?.enumStringParameter,
    args?.enumInt32Parameter,
    args?.enumDoubleParameter,
    args?.enumBooleanParameter
  ),
  updateEntityWithPut: (args?: {
    body?: TestEntity[]
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateEntityWithPut'>(
    DefaultApi,
    'updateEntityWithPut',
    args?.body
  ),
  createEntity: (args?: {
    body?: TestEntity
  }) => new OpenApiRequestBuilder<DefaultApi, 'createEntity'>(
    DefaultApi,
    'createEntity',
    args?.body
  ),
  updateEntity: (args?: {
    body?: Record<string, any>
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateEntity'>(
    DefaultApi,
    'updateEntity',
    args?.body
  ),
  deleteEntity: (args?: {
    body?: string[]
  }) => new OpenApiRequestBuilder<DefaultApi, 'deleteEntity'>(
    DefaultApi,
    'deleteEntity',
    args?.body
  ),
  getEntityByKey: (args: {
    entityId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getEntityByKey'>(
    DefaultApi,
    'getEntityByKey',
    args.entityId
  ),
  countEntities: () => new OpenApiRequestBuilder<DefaultApi, 'countEntities'>(
    DefaultApi,
    'countEntities'
  ),
  testCaseGetRequiredParameters: (args: {
    requiredPathItemQueryParam: string,
    requiredPathItemPathParam: string,
    requiredQueryParam: string,
    optionalQueryParam?: string,
    optionalPathItemQueryParam?: string,
    body?: SimpleTestEntity
  }) => new OpenApiRequestBuilder<DefaultApi, 'testCaseGetRequiredParameters'>(
    DefaultApi,
    'testCaseGetRequiredParameters',
    args.requiredPathItemQueryParam,
    args.requiredPathItemPathParam,
    args.requiredQueryParam,
    args.optionalQueryParam,
    args.optionalPathItemQueryParam,
    args.body
  ),
  testCasePostRequiredParameters: (args: {
    requiredPathItemQueryParam: string,
    requiredPathItemPathParam: string,
    requiredQueryParam: string,
    body: SimpleTestEntity,
    optionalPathItemQueryParam?: string,
    optionalQueryParam?: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'testCasePostRequiredParameters'>(
    DefaultApi,
    'testCasePostRequiredParameters',
    args.requiredPathItemQueryParam,
    args.requiredPathItemPathParam,
    args.requiredQueryParam,
    args.body,
    args.optionalPathItemQueryParam,
    args.optionalQueryParam
  ),
  testCaseGetDuplicateParameters: (args: {
    duplicateParam: string,
    duplicateParam2: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'testCaseGetDuplicateParameters'>(
    DefaultApi,
    'testCaseGetDuplicateParameters',
    args.duplicateParam,
    args.duplicateParam2
  ),
  getTestCasesNoOperationId: () => new OpenApiRequestBuilder<DefaultApi, 'getTestCasesNoOperationId'>(
    DefaultApi,
    'getTestCasesNoOperationId'
  ),
  duplicateOperationId: () => new OpenApiRequestBuilder<DefaultApi, 'duplicateOperationId'>(
    DefaultApi,
    'duplicateOperationId'
  ),
  duplicateOperationId2: () => new OpenApiRequestBuilder<DefaultApi, 'duplicateOperationId2'>(
    DefaultApi,
    'duplicateOperationId2'
  ),
  duplicateOperationId3: () => new OpenApiRequestBuilder<DefaultApi, 'duplicateOperationId3'>(
    DefaultApi,
    'duplicateOperationId3'
  ),
  duplicateOperationId1: () => new OpenApiRequestBuilder<DefaultApi, 'duplicateOperationId1'>(
    DefaultApi,
    'duplicateOperationId1'
  )
};
