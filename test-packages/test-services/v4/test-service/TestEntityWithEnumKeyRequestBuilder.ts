/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  RequestBuilder,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  CreateRequestBuilderV4,
  UpdateRequestBuilderV4,
  DeleteRequestBuilderV4
} from '@sap-cloud-sdk/core';
import { TestEntityWithEnumKey } from './TestEntityWithEnumKey';
import { TestEnumType } from './TestEnumType';

/**
 * Request builder class for operations supported on the [[TestEntityWithEnumKey]] entity.
 */
export class TestEntityWithEnumKeyRequestBuilder extends RequestBuilder<TestEntityWithEnumKey> {
  /**
   * Returns a request builder for retrieving one `TestEntityWithEnumKey` entity based on its keys.
   * @param keyPropertyEnum1 Key property. See [[TestEntityWithEnumKey.keyPropertyEnum1]].
   * @returns A request builder for creating requests to retrieve one `TestEntityWithEnumKey` entity based on its keys.
   */
  getByKey(
    keyPropertyEnum1: TestEnumType
  ): GetByKeyRequestBuilderV4<TestEntityWithEnumKey> {
    return new GetByKeyRequestBuilderV4(TestEntityWithEnumKey, {
      KeyPropertyEnum1: keyPropertyEnum1
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityWithEnumKey` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithEnumKey` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntityWithEnumKey> {
    return new GetAllRequestBuilderV4(TestEntityWithEnumKey);
  }

  /**
   * Returns a request builder for creating a `TestEntityWithEnumKey` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithEnumKey`.
   */
  create(
    entity: TestEntityWithEnumKey
  ): CreateRequestBuilderV4<TestEntityWithEnumKey> {
    return new CreateRequestBuilderV4(TestEntityWithEnumKey, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityWithEnumKey`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithEnumKey`.
   */
  update(
    entity: TestEntityWithEnumKey
  ): UpdateRequestBuilderV4<TestEntityWithEnumKey> {
    return new UpdateRequestBuilderV4(TestEntityWithEnumKey, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithEnumKey`.
   * @param keyPropertyEnum1 Key property. See [[TestEntityWithEnumKey.keyPropertyEnum1]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithEnumKey`.
   */
  delete(
    keyPropertyEnum1: TestEnumType
  ): DeleteRequestBuilderV4<TestEntityWithEnumKey>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithEnumKey`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithEnumKey` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityWithEnumKey
  ): DeleteRequestBuilderV4<TestEntityWithEnumKey>;
  delete(
    keyPropertyEnum1OrEntity: any
  ): DeleteRequestBuilderV4<TestEntityWithEnumKey> {
    return new DeleteRequestBuilderV4(
      TestEntityWithEnumKey,
      keyPropertyEnum1OrEntity instanceof TestEntityWithEnumKey
        ? keyPropertyEnum1OrEntity
        : { KeyPropertyEnum1: keyPropertyEnum1OrEntity! }
    );
  }
}
