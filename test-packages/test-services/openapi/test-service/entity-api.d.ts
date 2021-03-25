import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { EntityApi } from './openapi/api';
import { TestEntity } from './openapi/model';
export declare const TestServiceEntityApi: {
  getAllEntities: (
    args?:
      | {
          stringParameter?: string | undefined;
          integerParameter?: number | undefined;
          dollarParameter?: string | undefined;
          dotParameter?: string | undefined;
          enumStringParameter?: 'value1' | 'value2' | undefined;
          enumInt32Parameter?: 1 | 2 | undefined;
          enumDoubleParameter?: 1 | 2 | undefined;
          enumBooleanParameter?: boolean | undefined;
        }
      | undefined
  ) => OpenApiRequestBuilder<EntityApi, 'getAllEntities'>;
  updateEntityWithPut: (
    args?:
      | {
          body?: TestEntity[] | undefined;
        }
      | undefined
  ) => OpenApiRequestBuilder<EntityApi, 'updateEntityWithPut'>;
  createEntity: (
    args?:
      | {
          body?: TestEntity | undefined;
        }
      | undefined
  ) => OpenApiRequestBuilder<EntityApi, 'createEntity'>;
  updateEntity: (
    args?:
      | {
          body?: Record<string, any> | undefined;
        }
      | undefined
  ) => OpenApiRequestBuilder<EntityApi, 'updateEntity'>;
  deleteEntity: (
    args?:
      | {
          body?: string[] | undefined;
        }
      | undefined
  ) => OpenApiRequestBuilder<EntityApi, 'deleteEntity'>;
  getEntityByKey: (args: {
    entityId: string;
  }) => OpenApiRequestBuilder<EntityApi, 'getEntityByKey'>;
  countEntities: () => OpenApiRequestBuilder<EntityApi, 'countEntities'>;
};
//# sourceMappingURL=entity-api.d.ts.map
