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
import { TestEntityLvl2SingleLink } from './TestEntityLvl2SingleLink';

/**
 * Request builder class for operations supported on the {@link TestEntityLvl2SingleLink} entity.
 */
export class TestEntityLvl2SingleLinkRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntityLvl2SingleLink<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntityLvl2SingleLink` entity based on its keys.
   * @param keyProperty Key property. See {@link TestEntityLvl2SingleLink.keyProperty}.
   * @returns A request builder for creating requests to retrieve one `TestEntityLvl2SingleLink` entity based on its keys.
   */
  getByKey(
    keyProperty: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<TestEntityLvl2SingleLink<T>, T> {
    return new GetByKeyRequestBuilder<TestEntityLvl2SingleLink<T>, T>(
      this.entityApi,
      { KeyProperty: keyProperty }
    );
  }

  /**
   * Returns a request builder for querying all `TestEntityLvl2SingleLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl2SingleLink` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityLvl2SingleLink<T>, T> {
    return new GetAllRequestBuilder<TestEntityLvl2SingleLink<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for creating a `TestEntityLvl2SingleLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl2SingleLink`.
   */
  create(
    entity: TestEntityLvl2SingleLink<T>
  ): CreateRequestBuilder<TestEntityLvl2SingleLink<T>, T> {
    return new CreateRequestBuilder<TestEntityLvl2SingleLink<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl2SingleLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl2SingleLink`.
   */
  update(
    entity: TestEntityLvl2SingleLink<T>
  ): UpdateRequestBuilder<TestEntityLvl2SingleLink<T>, T> {
    return new UpdateRequestBuilder<TestEntityLvl2SingleLink<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl2SingleLink`.
   * @param keyProperty Key property. See {@link TestEntityLvl2SingleLink.keyProperty}.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2SingleLink`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilder<TestEntityLvl2SingleLink<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl2SingleLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2SingleLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityLvl2SingleLink<T>
  ): DeleteRequestBuilder<TestEntityLvl2SingleLink<T>, T>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityLvl2SingleLink<T>, T> {
    return new DeleteRequestBuilder<TestEntityLvl2SingleLink<T>, T>(
      this.entityApi,
      keyPropertyOrEntity instanceof TestEntityLvl2SingleLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
