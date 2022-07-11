/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DefaultDeSerializers,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder,
  DeserializedType,
  RequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { TestEntityWithSharedEntityType1 } from './TestEntityWithSharedEntityType1';

/**
 * Request builder class for operations supported on the {@link TestEntityWithSharedEntityType1} entity.
 */
export class TestEntityWithSharedEntityType1RequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntityWithSharedEntityType1<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntityWithSharedEntityType1` entity based on its keys.
   * @param keyProperty Key property. See {@link TestEntityWithSharedEntityType1.keyProperty}.
   * @returns A request builder for creating requests to retrieve one `TestEntityWithSharedEntityType1` entity based on its keys.
   */
  getByKey(
    keyProperty: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<TestEntityWithSharedEntityType1<T>, T> {
    return new GetByKeyRequestBuilder<TestEntityWithSharedEntityType1<T>, T>(
      this.entityApi,
      { KeyProperty: keyProperty }
    );
  }

  /**
   * Returns a request builder for querying all `TestEntityWithSharedEntityType1` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithSharedEntityType1` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityWithSharedEntityType1<T>, T> {
    return new GetAllRequestBuilder<TestEntityWithSharedEntityType1<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for creating a `TestEntityWithSharedEntityType1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithSharedEntityType1`.
   */
  create(
    entity: TestEntityWithSharedEntityType1<T>
  ): CreateRequestBuilder<TestEntityWithSharedEntityType1<T>, T> {
    return new CreateRequestBuilder<TestEntityWithSharedEntityType1<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityWithSharedEntityType1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithSharedEntityType1`.
   */
  update(
    entity: TestEntityWithSharedEntityType1<T>
  ): UpdateRequestBuilder<TestEntityWithSharedEntityType1<T>, T> {
    return new UpdateRequestBuilder<TestEntityWithSharedEntityType1<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithSharedEntityType1`.
   * @param keyProperty Key property. See {@link TestEntityWithSharedEntityType1.keyProperty}.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithSharedEntityType1`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilder<TestEntityWithSharedEntityType1<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithSharedEntityType1`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithSharedEntityType1` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityWithSharedEntityType1<T>
  ): DeleteRequestBuilder<TestEntityWithSharedEntityType1<T>, T>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityWithSharedEntityType1<T>, T> {
    return new DeleteRequestBuilder<TestEntityWithSharedEntityType1<T>, T>(
      this.entityApi,
      keyPropertyOrEntity instanceof TestEntityWithSharedEntityType1
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
