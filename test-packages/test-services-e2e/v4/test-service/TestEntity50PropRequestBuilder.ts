/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntity50Prop } from './TestEntity50Prop';

/**
 * Request builder class for operations supported on the {@link TestEntity50Prop} entity.
 */
export class TestEntity50PropRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntity50Prop<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntity50Prop` entity based on its keys.
   * @param keyTestEntity50Prop Key property. See {@link TestEntity50Prop.keyTestEntity50Prop}.
   * @returns A request builder for creating requests to retrieve one `TestEntity50Prop` entity based on its keys.
   */
  getByKey(keyTestEntity50Prop: DeserializedType<T, 'Edm.Int32'>): GetByKeyRequestBuilder<TestEntity50Prop<T>, T> {
    return new GetByKeyRequestBuilder<TestEntity50Prop<T>, T>(this.entityApi, { KeyTestEntity50Prop: keyTestEntity50Prop });
  }

  /**
   * Returns a request builder for querying all `TestEntity50Prop` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity50Prop` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntity50Prop<T>, T> {
    return new GetAllRequestBuilder<TestEntity50Prop<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `TestEntity50Prop` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity50Prop`.
   */
  create(entity: TestEntity50Prop<T>): CreateRequestBuilder<TestEntity50Prop<T>, T> {
    return new CreateRequestBuilder<TestEntity50Prop<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntity50Prop`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity50Prop`.
   */
  update(entity: TestEntity50Prop<T>): UpdateRequestBuilder<TestEntity50Prop<T>, T> {
    return new UpdateRequestBuilder<TestEntity50Prop<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntity50Prop`.
   * @param keyTestEntity50Prop Key property. See {@link TestEntity50Prop.keyTestEntity50Prop}.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity50Prop`.
   */
  delete(keyTestEntity50Prop: number): DeleteRequestBuilder<TestEntity50Prop<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity50Prop`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity50Prop` by taking the entity as a parameter.
   */
  delete(entity: TestEntity50Prop<T>): DeleteRequestBuilder<TestEntity50Prop<T>, T>;
  delete(keyTestEntity50PropOrEntity: any): DeleteRequestBuilder<TestEntity50Prop<T>, T> {
    return new DeleteRequestBuilder<TestEntity50Prop<T>, T>(this.entityApi, keyTestEntity50PropOrEntity instanceof TestEntity50Prop ? keyTestEntity50PropOrEntity : { KeyTestEntity50Prop: keyTestEntity50PropOrEntity! });
  }
}
