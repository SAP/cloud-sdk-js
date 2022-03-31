/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntity50Col } from './TestEntity50Col';

/**
 * Request builder class for operations supported on the [[TestEntity50Col]] entity.
 */
export class TestEntity50ColRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntity50Col<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntity50Col` entity based on its keys.
   * @param keyTestEntity50Col Key property. See [[TestEntity50Col.keyTestEntity50Col]].
   * @returns A request builder for creating requests to retrieve one `TestEntity50Col` entity based on its keys.
   */
  getByKey(keyTestEntity50Col: DeserializedType<T, 'Edm.Int32'>): GetByKeyRequestBuilder<TestEntity50Col<T>, T> {
    return new GetByKeyRequestBuilder<TestEntity50Col<T>, T>(this.entityApi, { KeyTestEntity50Col: keyTestEntity50Col });
  }

  /**
   * Returns a request builder for querying all `TestEntity50Col` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity50Col` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntity50Col<T>, T> {
    return new GetAllRequestBuilder<TestEntity50Col<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `TestEntity50Col` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity50Col`.
   */
  create(entity: TestEntity50Col<T>): CreateRequestBuilder<TestEntity50Col<T>, T> {
    return new CreateRequestBuilder<TestEntity50Col<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntity50Col`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity50Col`.
   */
  update(entity: TestEntity50Col<T>): UpdateRequestBuilder<TestEntity50Col<T>, T> {
    return new UpdateRequestBuilder<TestEntity50Col<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntity50Col`.
   * @param keyTestEntity50Col Key property. See [[TestEntity50Col.keyTestEntity50Col]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity50Col`.
   */
  delete(keyTestEntity50Col: number): DeleteRequestBuilder<TestEntity50Col<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity50Col`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity50Col` by taking the entity as a parameter.
   */
  delete(entity: TestEntity50Col<T>): DeleteRequestBuilder<TestEntity50Col<T>, T>;
  delete(keyTestEntity50ColOrEntity: any): DeleteRequestBuilder<TestEntity50Col<T>, T> {
    return new DeleteRequestBuilder<TestEntity50Col<T>, T>(this.entityApi, keyTestEntity50ColOrEntity instanceof TestEntity50Col ? keyTestEntity50ColOrEntity : { KeyTestEntity50Col: keyTestEntity50ColOrEntity! });
  }
}
