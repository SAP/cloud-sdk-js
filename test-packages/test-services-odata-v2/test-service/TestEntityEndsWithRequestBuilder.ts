/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilder,
  DeSerializers,
  DefaultDeSerializers,
  DeleteRequestBuilder,
  DeserializedType,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  RequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { TestEntityEndsWith } from './TestEntityEndsWith';

/**
 * Request builder class for operations supported on the {@link TestEntityEndsWith} entity.
 */
export class TestEntityEndsWithRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntityEndsWith<T>, T> {
  /**
   * Returns a request builder for querying all `TestEntityEndsWith` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWith` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityEndsWith<T>, T> {
    return new GetAllRequestBuilder<TestEntityEndsWith<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `TestEntityEndsWith` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWith`.
   */
  create(
    entity: TestEntityEndsWith<T>
  ): CreateRequestBuilder<TestEntityEndsWith<T>, T> {
    return new CreateRequestBuilder<TestEntityEndsWith<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for retrieving one `TestEntityEndsWith` entity based on its keys.
   * @param keyProperty Key property. See {@link TestEntityEndsWith.keyProperty}.
   * @returns A request builder for creating requests to retrieve one `TestEntityEndsWith` entity based on its keys.
   */
  getByKey(
    keyProperty: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<TestEntityEndsWith<T>, T> {
    return new GetByKeyRequestBuilder<TestEntityEndsWith<T>, T>(
      this.entityApi,
      { KeyProperty: keyProperty }
    );
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWith`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWith`.
   */
  update(
    entity: TestEntityEndsWith<T>
  ): UpdateRequestBuilder<TestEntityEndsWith<T>, T> {
    return new UpdateRequestBuilder<TestEntityEndsWith<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
   * @param keyProperty Key property. See {@link TestEntityEndsWith.keyProperty}.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith`.
   */
  delete(keyProperty: string): DeleteRequestBuilder<TestEntityEndsWith<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityEndsWith<T>
  ): DeleteRequestBuilder<TestEntityEndsWith<T>, T>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityEndsWith<T>, T> {
    return new DeleteRequestBuilder<TestEntityEndsWith<T>, T>(
      this.entityApi,
      keyPropertyOrEntity instanceof TestEntityEndsWith
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
