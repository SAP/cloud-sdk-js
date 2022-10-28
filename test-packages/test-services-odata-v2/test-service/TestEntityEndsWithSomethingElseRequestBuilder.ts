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
import { TestEntityEndsWithSomethingElse } from './TestEntityEndsWithSomethingElse';

/**
 * Request builder class for operations supported on the {@link TestEntityEndsWithSomethingElse} entity.
 */
export class TestEntityEndsWithSomethingElseRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntityEndsWithSomethingElse<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntityEndsWithSomethingElse` entity based on its keys.
   * @param keyProperty Key property. See {@link TestEntityEndsWithSomethingElse.keyProperty}.
   * @returns A request builder for creating requests to retrieve one `TestEntityEndsWithSomethingElse` entity based on its keys.
   */
  getByKey(
    keyProperty: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<TestEntityEndsWithSomethingElse<T>, T> {
    return new GetByKeyRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>(
      this.entityApi,
      { KeyProperty: keyProperty }
    );
  }

  /**
   * Returns a request builder for querying all `TestEntityEndsWithSomethingElse` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWithSomethingElse` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityEndsWithSomethingElse<T>, T> {
    return new GetAllRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for creating a `TestEntityEndsWithSomethingElse` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWithSomethingElse`.
   */
  create(
    entity: TestEntityEndsWithSomethingElse<T>
  ): CreateRequestBuilder<TestEntityEndsWithSomethingElse<T>, T> {
    return new CreateRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWithSomethingElse`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWithSomethingElse`.
   */
  update(
    entity: TestEntityEndsWithSomethingElse<T>
  ): UpdateRequestBuilder<TestEntityEndsWithSomethingElse<T>, T> {
    return new UpdateRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWithSomethingElse`.
   * @param keyProperty Key property. See {@link TestEntityEndsWithSomethingElse.keyProperty}.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWithSomethingElse`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWithSomethingElse`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWithSomethingElse` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityEndsWithSomethingElse<T>
  ): DeleteRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityEndsWithSomethingElse<T>, T> {
    return new DeleteRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>(
      this.entityApi,
      keyPropertyOrEntity instanceof TestEntityEndsWithSomethingElse
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
