/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { TestEntity } from './schema';
/**
 * Representation of the 'EntityApi'.
 * This API is part of the 'test-service' service.
 */
export declare const EntityApi: {
  /**
   * Get all entities
   * @param queryParameters - Object containing the following keys: stringParameter, integerParameter, $dollarParameter, dot.parameter, enumStringParameter, enumInt32Parameter, enumDoubleParameter, enumBooleanParameter.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getAllEntities: (queryParameters?: {
    stringParameter?: string;
    integerParameter?: number;
    $dollarParameter?: string;
    'dot.parameter'?: string;
    enumStringParameter?: 'value1' | 'value2' | "valueWith'Quote";
    enumInt32Parameter?: 1 | 2;
    enumDoubleParameter?: 1 | 2;
    enumBooleanParameter?: true | false;
  }) => OpenApiRequestBuilder<TestEntity[]>;
  /**
   * Create a request builder for execution of put requests to the '/entities' endpoint.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateEntityWithPut: (
    body: TestEntity[] | undefined
  ) => OpenApiRequestBuilder<any>;
  /**
   * Create entity
   * @param body - Entity to create
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createEntity: (body: TestEntity | undefined) => OpenApiRequestBuilder<any>;
  /**
   * Create a request builder for execution of patch requests to the '/entities' endpoint.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateEntity: (
    body: Record<string, any> | undefined
  ) => OpenApiRequestBuilder<any>;
  /**
   * Create a request builder for execution of delete requests to the '/entities' endpoint.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteEntity: (body: string[] | undefined) => OpenApiRequestBuilder<any>;
  /**
   * Head request of entities
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  headEntities: () => OpenApiRequestBuilder<any>;
  /**
   * Get entity by id
   * @param entityId - Key property of the entity
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getEntityByKey: (entityId: string) => OpenApiRequestBuilder<any>;
  /**
   * Count entities
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  countEntities: () => OpenApiRequestBuilder<number>;
};
//# sourceMappingURL=entity-api.d.ts.map
