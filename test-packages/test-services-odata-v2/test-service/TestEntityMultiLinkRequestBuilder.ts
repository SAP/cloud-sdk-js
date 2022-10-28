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
import { TestEntityMultiLink } from './TestEntityMultiLink';

/**
 * Request builder class for operations supported on the {@link TestEntityMultiLink} entity.
 */
export class TestEntityMultiLinkRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntityMultiLink<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntityMultiLink` entity based on its keys.
   * @param keyProperty Key property. See {@link TestEntityMultiLink.keyProperty}.
   * @returns A request builder for creating requests to retrieve one `TestEntityMultiLink` entity based on its keys.
   */
  getByKey(
    keyProperty: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<TestEntityMultiLink<T>, T> {
    return new GetByKeyRequestBuilder<TestEntityMultiLink<T>, T>(
      this.entityApi,
      { KeyProperty: keyProperty }
    );
  }

  /**
   * Returns a request builder for querying all `TestEntityMultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityMultiLink` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityMultiLink<T>, T> {
    return new GetAllRequestBuilder<TestEntityMultiLink<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `TestEntityMultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityMultiLink`.
   */
  create(
    entity: TestEntityMultiLink<T>
  ): CreateRequestBuilder<TestEntityMultiLink<T>, T> {
    return new CreateRequestBuilder<TestEntityMultiLink<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityMultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityMultiLink`.
   */
  update(
    entity: TestEntityMultiLink<T>
  ): UpdateRequestBuilder<TestEntityMultiLink<T>, T> {
    return new UpdateRequestBuilder<TestEntityMultiLink<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityMultiLink`.
   * @param keyProperty Key property. See {@link TestEntityMultiLink.keyProperty}.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityMultiLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilder<TestEntityMultiLink<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityMultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityMultiLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityMultiLink<T>
  ): DeleteRequestBuilder<TestEntityMultiLink<T>, T>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityMultiLink<T>, T> {
    return new DeleteRequestBuilder<TestEntityMultiLink<T>, T>(
      this.entityApi,
      keyPropertyOrEntity instanceof TestEntityMultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
