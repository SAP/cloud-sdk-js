/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder } from '@sap-cloud-sdk/odata-common/internal';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from './TestEntity';

/**
 * Request builder class for operations supported on the [[TestEntity]] entity.
 */
export class TestEntityRequestBuilder extends RequestBuilder<TestEntity> {
  /**
   * Returns a request builder for retrieving one `TestEntity` entity based on its keys.
   * @param keyTestEntity Key property. See [[TestEntity.keyTestEntity]].
   * @returns A request builder for creating requests to retrieve one `TestEntity` entity based on its keys.
   */
  getByKey(keyTestEntity: number): GetByKeyRequestBuilder<TestEntity> {
    return new GetByKeyRequestBuilder(TestEntity, {
      KeyTestEntity: keyTestEntity
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
   * @param keyTestEntity Key property. See [[TestEntity.keyTestEntity]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity`.
   */
  delete(keyTestEntity: number): DeleteRequestBuilder<TestEntity>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity` by taking the entity as a parameter.
   */
  delete(entity: TestEntity): DeleteRequestBuilder<TestEntity>;
  delete(keyTestEntityOrEntity: any): DeleteRequestBuilder<TestEntity> {
    return new DeleteRequestBuilder(
      TestEntity,
      keyTestEntityOrEntity instanceof TestEntity
        ? keyTestEntityOrEntity
        : { KeyTestEntity: keyTestEntityOrEntity! }
    );
  }
}
