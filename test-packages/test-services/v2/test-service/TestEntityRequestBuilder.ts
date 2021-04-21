/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilderV2, GetByKeyRequestBuilderV2, CreateRequestBuilderV2, UpdateRequestBuilderV2, DeleteRequestBuilderV2 } from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';

/**
 * Request builder class for operations supported on the [[TestEntity]] entity.
 */
export class TestEntityRequestBuilder extends RequestBuilder<TestEntity> {
  /**
   * Returns a request builder for retrieving one `TestEntity` entity based on its keys.
   * @param keyPropertyGuid Key property. See [[TestEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity` entity based on its keys.
   */
  getByKey(keyPropertyGuid: string, keyPropertyString: string): GetByKeyRequestBuilderV2<TestEntity> {
    return new GetByKeyRequestBuilderV2(TestEntity, {
      KeyPropertyGuid: keyPropertyGuid,
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `TestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity` entities.
   */
  getAll(): GetAllRequestBuilderV2<TestEntity> {
    return new GetAllRequestBuilderV2(TestEntity);
  }

  /**
   * Returns a request builder for creating a `TestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity`.
   */
  create(entity: TestEntity): CreateRequestBuilderV2<TestEntity> {
    return new CreateRequestBuilderV2(TestEntity, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity`.
   */
  update(entity: TestEntity): UpdateRequestBuilderV2<TestEntity> {
    return new UpdateRequestBuilderV2(TestEntity, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param keyPropertyGuid Key property. See [[TestEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity`.
   */
  delete(keyPropertyGuid: string, keyPropertyString: string): DeleteRequestBuilderV2<TestEntity>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity` by taking the entity as a parameter.
   */
  delete(entity: TestEntity): DeleteRequestBuilderV2<TestEntity>;
  delete(keyPropertyGuidOrEntity: any, keyPropertyString?: string): DeleteRequestBuilderV2<TestEntity> {
    return new DeleteRequestBuilderV2(TestEntity, keyPropertyGuidOrEntity instanceof TestEntity ? keyPropertyGuidOrEntity : {
      KeyPropertyGuid: keyPropertyGuidOrEntity!,
      KeyPropertyString: keyPropertyString!
    });
  }
}
