import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { TestEntity } from './schema';
/**
 * Representation of the 'EntityApi'.
 * This API is part of the 'TestService' service.
 */
export declare const EntityApi: {
  /**
   * Get all entities
   * @param queryParameters Object containing the following keys: stringParameter, integerParameter, $dollarParameter, dot.parameter, enumStringParameter, enumInt32Parameter, enumDoubleParameter, enumBooleanParameter.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  getAllEntities: (
    queryParameters?:
      | {
          stringParameter?: string | undefined;
          integerParameter?: number | undefined;
          $dollarParameter?: string | undefined;
          'dot.parameter'?: string | undefined;
          enumStringParameter?: 'value1' | 'value2' | undefined;
          enumInt32Parameter?: 1 | 2 | undefined;
          enumDoubleParameter?: 1 | 2 | undefined;
          enumBooleanParameter?: boolean | undefined;
        }
      | undefined
  ) => OpenApiRequestBuilder<TestEntity[]>;
  /**
   * Create a request builder for execution of put requests to the '/entities' endpoint.
   * @param body Request body.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  updateEntityWithPut: (
    body: TestEntity[] | undefined
  ) => OpenApiRequestBuilder<any>;
  /**
   * Create entity
   * @param body Entity to create
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  createEntity: (body: TestEntity | undefined) => OpenApiRequestBuilder<any>;
  /**
   * Create a request builder for execution of patch requests to the '/entities' endpoint.
   * @param body Request body.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  updateEntity: (
    body: Record<string, any> | undefined
  ) => OpenApiRequestBuilder<any>;
  /**
   * Create a request builder for execution of delete requests to the '/entities' endpoint.
   * @param body Request body.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  deleteEntity: (body: string[] | undefined) => OpenApiRequestBuilder<any>;
  /**
   * Head request of entities
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  headEntities: () => OpenApiRequestBuilder<any>;
  /**
   * Get entity by id
   * @param entityId Key property of the entity
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  getEntityByKey: (entityId: string) => OpenApiRequestBuilder<any>;
  /**
   * Count entities
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  countEntities: () => OpenApiRequestBuilder<number>;
};
//# sourceMappingURL=entity-api.d.ts.map
