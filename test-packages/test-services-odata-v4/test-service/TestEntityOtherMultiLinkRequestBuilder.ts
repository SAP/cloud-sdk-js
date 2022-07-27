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
} from '@sap-cloud-sdk/odata-v4';
import { TestEntityOtherMultiLink } from './TestEntityOtherMultiLink';

/**
 * Request builder class for operations supported on the {@link TestEntityOtherMultiLink} entity.
 */
export class TestEntityOtherMultiLinkRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntityOtherMultiLink<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntityOtherMultiLink` entity based on its keys.
   * @param keyProperty Key property. See {@link TestEntityOtherMultiLink.keyProperty}.
   * @returns A request builder for creating requests to retrieve one `TestEntityOtherMultiLink` entity based on its keys.
   */
  getByKey(
    keyProperty: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<TestEntityOtherMultiLink<T>, T> {
    return new GetByKeyRequestBuilder<TestEntityOtherMultiLink<T>, T>(
      this.entityApi,
      { KeyProperty: keyProperty }
    );
  }

  /**
   * Returns a request builder for querying all `TestEntityOtherMultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityOtherMultiLink` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityOtherMultiLink<T>, T> {
    return new GetAllRequestBuilder<TestEntityOtherMultiLink<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for creating a `TestEntityOtherMultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityOtherMultiLink`.
   */
  create(
    entity: TestEntityOtherMultiLink<T>
  ): CreateRequestBuilder<TestEntityOtherMultiLink<T>, T> {
    return new CreateRequestBuilder<TestEntityOtherMultiLink<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityOtherMultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityOtherMultiLink`.
   */
  update(
    entity: TestEntityOtherMultiLink<T>
  ): UpdateRequestBuilder<TestEntityOtherMultiLink<T>, T> {
    return new UpdateRequestBuilder<TestEntityOtherMultiLink<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityOtherMultiLink`.
   * @param keyProperty Key property. See {@link TestEntityOtherMultiLink.keyProperty}.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityOtherMultiLink`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilder<TestEntityOtherMultiLink<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityOtherMultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityOtherMultiLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityOtherMultiLink<T>
  ): DeleteRequestBuilder<TestEntityOtherMultiLink<T>, T>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityOtherMultiLink<T>, T> {
    return new DeleteRequestBuilder<TestEntityOtherMultiLink<T>, T>(
      this.entityApi,
      keyPropertyOrEntity instanceof TestEntityOtherMultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
