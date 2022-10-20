/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntityWithMultipleKeys } from './TestEntityWithMultipleKeys';

/**
 * Request builder class for operations supported on the {@link TestEntityWithMultipleKeys} entity.
 */
export class TestEntityWithMultipleKeysRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntityWithMultipleKeys<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntityWithMultipleKeys` entity based on its keys.
   * @param keyTestEntityWithMultipleKeys Key property. See {@link TestEntityWithMultipleKeys.keyTestEntityWithMultipleKeys}.
   * @param stringPropertyWithMultipleKeys Key property. See {@link TestEntityWithMultipleKeys.stringPropertyWithMultipleKeys}.
   * @param booleanPropertyWithMultipleKeys Key property. See {@link TestEntityWithMultipleKeys.booleanPropertyWithMultipleKeys}.
   * @returns A request builder for creating requests to retrieve one `TestEntityWithMultipleKeys` entity based on its keys.
   */
  getByKey(keyTestEntityWithMultipleKeys: DeserializedType<T, 'Edm.Int32'>, stringPropertyWithMultipleKeys: DeserializedType<T, 'Edm.String'>, booleanPropertyWithMultipleKeys: DeserializedType<T, 'Edm.Boolean'>): GetByKeyRequestBuilder<TestEntityWithMultipleKeys<T>, T> {
    return new GetByKeyRequestBuilder<TestEntityWithMultipleKeys<T>, T>(this.entityApi, {
      KeyTestEntityWithMultipleKeys: keyTestEntityWithMultipleKeys,
      StringPropertyWithMultipleKeys: stringPropertyWithMultipleKeys,
      BooleanPropertyWithMultipleKeys: booleanPropertyWithMultipleKeys
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityWithMultipleKeys` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithMultipleKeys` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityWithMultipleKeys<T>, T> {
    return new GetAllRequestBuilder<TestEntityWithMultipleKeys<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `TestEntityWithMultipleKeys` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithMultipleKeys`.
   */
  create(entity: TestEntityWithMultipleKeys<T>): CreateRequestBuilder<TestEntityWithMultipleKeys<T>, T> {
    return new CreateRequestBuilder<TestEntityWithMultipleKeys<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityWithMultipleKeys`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithMultipleKeys`.
   */
  update(entity: TestEntityWithMultipleKeys<T>): UpdateRequestBuilder<TestEntityWithMultipleKeys<T>, T> {
    return new UpdateRequestBuilder<TestEntityWithMultipleKeys<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithMultipleKeys`.
   * @param keyTestEntityWithMultipleKeys Key property. See {@link TestEntityWithMultipleKeys.keyTestEntityWithMultipleKeys}.
   * @param stringPropertyWithMultipleKeys Key property. See {@link TestEntityWithMultipleKeys.stringPropertyWithMultipleKeys}.
   * @param booleanPropertyWithMultipleKeys Key property. See {@link TestEntityWithMultipleKeys.booleanPropertyWithMultipleKeys}.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithMultipleKeys`.
   */
  delete(keyTestEntityWithMultipleKeys: number, stringPropertyWithMultipleKeys: string, booleanPropertyWithMultipleKeys: boolean): DeleteRequestBuilder<TestEntityWithMultipleKeys<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithMultipleKeys`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithMultipleKeys` by taking the entity as a parameter.
   */
  delete(entity: TestEntityWithMultipleKeys<T>): DeleteRequestBuilder<TestEntityWithMultipleKeys<T>, T>;
  delete(keyTestEntityWithMultipleKeysOrEntity: any, stringPropertyWithMultipleKeys?: string, booleanPropertyWithMultipleKeys?: boolean): DeleteRequestBuilder<TestEntityWithMultipleKeys<T>, T> {
    return new DeleteRequestBuilder<TestEntityWithMultipleKeys<T>, T>(this.entityApi, keyTestEntityWithMultipleKeysOrEntity instanceof TestEntityWithMultipleKeys ? keyTestEntityWithMultipleKeysOrEntity : {
      KeyTestEntityWithMultipleKeys: keyTestEntityWithMultipleKeysOrEntity!,
      StringPropertyWithMultipleKeys: stringPropertyWithMultipleKeys!,
      BooleanPropertyWithMultipleKeys: booleanPropertyWithMultipleKeys!
    });
  }
}
