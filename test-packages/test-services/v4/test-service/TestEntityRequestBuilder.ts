/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
import {
  DefaultDeSerializers,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { RequestBuilder } from '@sap-cloud-sdk/odata-v4/internal';
import { TestEntity } from './TestEntity';

/**
 * Request builder class for operations supported on the [[TestEntity]] entity.
 */
export class TestEntityRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntity<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntity` entity based on its keys.
   * @param keyPropertyGuid Key property. See [[TestEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity` entity based on its keys.
   */
  getByKey(
    keyPropertyGuid: DeserializedType<T, 'Edm.Guid'>,
    keyPropertyString: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<TestEntity<T>, T> {
    return new GetByKeyRequestBuilder<TestEntity<T>, T>(this.entityApi, {
      KeyPropertyGuid: keyPropertyGuid,
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `TestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntity<T>, T> {
    return new GetAllRequestBuilder<TestEntity<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `TestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity`.
   */
  create(entity: TestEntity<T>): CreateRequestBuilder<TestEntity<T>, T> {
    return new CreateRequestBuilder<TestEntity<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity`.
   */
  update(entity: TestEntity<T>): UpdateRequestBuilder<TestEntity<T>, T> {
    return new UpdateRequestBuilder<TestEntity<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param keyPropertyGuid Key property. See [[TestEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity`.
   */
  delete(
    keyPropertyGuid: string,
    keyPropertyString: string
  ): DeleteRequestBuilder<TestEntity<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity` by taking the entity as a parameter.
   */
  delete(entity: TestEntity<T>): DeleteRequestBuilder<TestEntity<T>, T>;
  delete(
    keyPropertyGuidOrEntity: any,
    keyPropertyString?: string
  ): DeleteRequestBuilder<TestEntity<T>, T> {
    return new DeleteRequestBuilder<TestEntity<T>, T>(
      this.entityApi,
      keyPropertyGuidOrEntity instanceof TestEntity
        ? keyPropertyGuidOrEntity
        : {
            KeyPropertyGuid: keyPropertyGuidOrEntity!,
            KeyPropertyString: keyPropertyString!
          }
    );
  }
}
