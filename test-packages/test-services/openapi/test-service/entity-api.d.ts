import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { TestEntity } from './schema';
/**
 * Representation of the EntityApi API.
 * This API is part of the TestService service.
 *
 * This API client has been created automatically using the SAP Cloud SDK - do not edit manually.
 */
export declare const EntityApi: {
  /**
   * Get all entities
   *
   * @param queryParameters Optional object containing the query parameters.
   * @returns TestEntity[]
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
   * Makes a put request to the '/entities' endpoint and returns a 'any'
   *
   * @param body Optional object containing the request body of type 'TestEntity[]'
   * @returns any
   */
  updateEntityWithPut: (
    body: TestEntity[] | undefined
  ) => OpenApiRequestBuilder<any>;
  /**
   * Create entity
   *
   * @param body Optional object containing the request body of type 'TestEntity'
   * @returns any
   */
  createEntity: (body: TestEntity | undefined) => OpenApiRequestBuilder<any>;
  /**
   * Makes a patch request to the '/entities' endpoint and returns a 'any'
   *
   * @param body Optional object containing the request body of type 'Record<string, any>'
   * @returns any
   */
  updateEntity: (
    body: Record<string, any> | undefined
  ) => OpenApiRequestBuilder<any>;
  /**
   * Makes a delete request to the '/entities' endpoint and returns a 'any'
   *
   * @param body Optional object containing the request body of type 'string[]'
   * @returns any
   */
  deleteEntity: (body: string[] | undefined) => OpenApiRequestBuilder<any>;
  /**
   * Get entity by id
   *
   * @param entityId Key property of the entity
   * @returns any
   */
  getEntityByKey: (entityId: string) => OpenApiRequestBuilder<any>;
  /**
   * Count entities
   *
   * @returns number
   */
  countEntities: () => OpenApiRequestBuilder<number>;
};
//# sourceMappingURL=entity-api.d.ts.map
