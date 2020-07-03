/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  RequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/core/v4';
import { TestEntity } from './TestEntity';

/**
 * Request builder class for operations supported on the [[TestEntity]] entity.
 */
export class TestEntityRequestBuilder extends RequestBuilder<TestEntity> {
  /**
   * Returns a request builder for retrieving one `TestEntity` entity based on its keys.
   * @param keyPropInt Key property. See [[TestEntity.keyPropInt]].
   * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity` entity based on its keys.
   */
  getByKey(
    keyPropInt: number,
    keyPropertyString: string
  ): GetByKeyRequestBuilder<TestEntity> {
    return new GetByKeyRequestBuilder(TestEntity, {
      KeyPropInt: keyPropInt,
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `TestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntity> {
    return new GetAllRequestBuilder(TestEntity);
  }

  /**
   * Returns a request builder for creating a `TestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity`.
   */
  create(entity: TestEntity): CreateRequestBuilder<TestEntity> {
    return new CreateRequestBuilder(TestEntity, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity`.
   */
  update(entity: TestEntity): UpdateRequestBuilder<TestEntity> {
    return new UpdateRequestBuilder(TestEntity, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param keyPropInt Key property. See [[TestEntity.keyPropInt]].
   * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity`.
   */
  delete(
    keyPropInt: number,
    keyPropertyString: string
  ): DeleteRequestBuilder<TestEntity>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity` by taking the entity as a parameter.
   */
  delete(entity: TestEntity): DeleteRequestBuilder<TestEntity>;
  delete(
    keyPropIntOrEntity: any,
    keyPropertyString?: string
  ): DeleteRequestBuilder<TestEntity> {
    return new DeleteRequestBuilder(
      TestEntity,
      keyPropIntOrEntity instanceof TestEntity
        ? keyPropIntOrEntity
        : {
            KeyPropInt: keyPropIntOrEntity!,
            KeyPropertyString: keyPropertyString!
          }
    );
  }
}
