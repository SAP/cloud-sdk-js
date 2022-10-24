/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntityLink } from './TestEntityLink';

/**
 * Request builder class for operations supported on the {@link TestEntityLink} entity.
 */
export class TestEntityLinkRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntityLink<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntityLink` entity based on its keys.
   * @param keyTestEntityLink Key property. See {@link TestEntityLink.keyTestEntityLink}.
   * @param keyToTestEntity Key property. See {@link TestEntityLink.keyToTestEntity}.
   * @returns A request builder for creating requests to retrieve one `TestEntityLink` entity based on its keys.
   */
  getByKey(keyTestEntityLink: DeserializedType<T, 'Edm.Int32'>, keyToTestEntity: DeserializedType<T, 'Edm.Int32'>): GetByKeyRequestBuilder<TestEntityLink<T>, T> {
    return new GetByKeyRequestBuilder<TestEntityLink<T>, T>(this.entityApi, {
      KeyTestEntityLink: keyTestEntityLink,
      KeyToTestEntity: keyToTestEntity
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLink` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityLink<T>, T> {
    return new GetAllRequestBuilder<TestEntityLink<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `TestEntityLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLink`.
   */
  create(entity: TestEntityLink<T>): CreateRequestBuilder<TestEntityLink<T>, T> {
    return new CreateRequestBuilder<TestEntityLink<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLink`.
   */
  update(entity: TestEntityLink<T>): UpdateRequestBuilder<TestEntityLink<T>, T> {
    return new UpdateRequestBuilder<TestEntityLink<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityLink`.
   * @param keyTestEntityLink Key property. See {@link TestEntityLink.keyTestEntityLink}.
   * @param keyToTestEntity Key property. See {@link TestEntityLink.keyToTestEntity}.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLink`.
   */
  delete(keyTestEntityLink: number, keyToTestEntity: number): DeleteRequestBuilder<TestEntityLink<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLink` by taking the entity as a parameter.
   */
  delete(entity: TestEntityLink<T>): DeleteRequestBuilder<TestEntityLink<T>, T>;
  delete(keyTestEntityLinkOrEntity: any, keyToTestEntity?: number): DeleteRequestBuilder<TestEntityLink<T>, T> {
    return new DeleteRequestBuilder<TestEntityLink<T>, T>(this.entityApi, keyTestEntityLinkOrEntity instanceof TestEntityLink ? keyTestEntityLinkOrEntity : {
      KeyTestEntityLink: keyTestEntityLinkOrEntity!,
      KeyToTestEntity: keyToTestEntity!
    });
  }
}
