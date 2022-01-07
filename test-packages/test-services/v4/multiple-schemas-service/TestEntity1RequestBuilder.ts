/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeserializedType,
  RequestBuilder
} from '@sap-cloud-sdk/odata-common/internal';
import {
  DefaultDeSerializers,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntity1 } from './TestEntity1';

/**
 * Request builder class for operations supported on the [[TestEntity1]] entity.
 */
export class TestEntity1RequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntity1<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntity1` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity1.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity1` entity based on its keys.
   */
  getByKey(
    keyPropertyString: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<TestEntity1<T>, T> {
    return new GetByKeyRequestBuilder<TestEntity1<T>, T>(this.entityApi, {
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `TestEntity1` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity1` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntity1<T>, T> {
    return new GetAllRequestBuilder<TestEntity1<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `TestEntity1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity1`.
   */
  create(entity: TestEntity1<T>): CreateRequestBuilder<TestEntity1<T>, T> {
    return new CreateRequestBuilder<TestEntity1<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntity1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity1`.
   */
  update(entity: TestEntity1<T>): UpdateRequestBuilder<TestEntity1<T>, T> {
    return new UpdateRequestBuilder<TestEntity1<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntity1`.
   * @param keyPropertyString Key property. See [[TestEntity1.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity1`.
   */
  delete(keyPropertyString: string): DeleteRequestBuilder<TestEntity1<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity1`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity1` by taking the entity as a parameter.
   */
  delete(entity: TestEntity1<T>): DeleteRequestBuilder<TestEntity1<T>, T>;
  delete(
    keyPropertyStringOrEntity: any
  ): DeleteRequestBuilder<TestEntity1<T>, T> {
    return new DeleteRequestBuilder<TestEntity1<T>, T>(
      this.entityApi,
      keyPropertyStringOrEntity instanceof TestEntity1
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity! }
    );
  }
}
