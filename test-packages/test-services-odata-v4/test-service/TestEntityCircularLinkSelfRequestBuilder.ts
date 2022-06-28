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
import { TestEntityCircularLinkSelf } from './TestEntityCircularLinkSelf';

/**
 * Request builder class for operations supported on the [[TestEntityCircularLinkSelf]] entity.
 */
export class TestEntityCircularLinkSelfRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntityCircularLinkSelf<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntityCircularLinkSelf` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityCircularLinkSelf.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityCircularLinkSelf` entity based on its keys.
   */
  getByKey(
    keyProperty: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<TestEntityCircularLinkSelf<T>, T> {
    return new GetByKeyRequestBuilder<TestEntityCircularLinkSelf<T>, T>(
      this.entityApi,
      { KeyProperty: keyProperty }
    );
  }

  /**
   * Returns a request builder for querying all `TestEntityCircularLinkSelf` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkSelf` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityCircularLinkSelf<T>, T> {
    return new GetAllRequestBuilder<TestEntityCircularLinkSelf<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for creating a `TestEntityCircularLinkSelf` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkSelf`.
   */
  create(
    entity: TestEntityCircularLinkSelf<T>
  ): CreateRequestBuilder<TestEntityCircularLinkSelf<T>, T> {
    return new CreateRequestBuilder<TestEntityCircularLinkSelf<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityCircularLinkSelf`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityCircularLinkSelf`.
   */
  update(
    entity: TestEntityCircularLinkSelf<T>
  ): UpdateRequestBuilder<TestEntityCircularLinkSelf<T>, T> {
    return new UpdateRequestBuilder<TestEntityCircularLinkSelf<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityCircularLinkSelf`.
   * @param keyProperty Key property. See [[TestEntityCircularLinkSelf.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkSelf`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilder<TestEntityCircularLinkSelf<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityCircularLinkSelf`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkSelf` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityCircularLinkSelf<T>
  ): DeleteRequestBuilder<TestEntityCircularLinkSelf<T>, T>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityCircularLinkSelf<T>, T> {
    return new DeleteRequestBuilder<TestEntityCircularLinkSelf<T>, T>(
      this.entityApi,
      keyPropertyOrEntity instanceof TestEntityCircularLinkSelf
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
