/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder } from '@sap-cloud-sdk/odata-common';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntityWithSharedEntityType1 } from './TestEntityWithSharedEntityType1';

/**
 * Request builder class for operations supported on the [[TestEntityWithSharedEntityType1]] entity.
 */
export class TestEntityWithSharedEntityType1RequestBuilder extends RequestBuilder<TestEntityWithSharedEntityType1> {
  /**
   * Returns a request builder for retrieving one `TestEntityWithSharedEntityType1` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityWithSharedEntityType1.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityWithSharedEntityType1` entity based on its keys.
   */
  getByKey(
    keyProperty: string
  ): GetByKeyRequestBuilder<TestEntityWithSharedEntityType1> {
    return new GetByKeyRequestBuilder(TestEntityWithSharedEntityType1, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityWithSharedEntityType1` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithSharedEntityType1` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityWithSharedEntityType1> {
    return new GetAllRequestBuilder(TestEntityWithSharedEntityType1);
  }

  /**
   * Returns a request builder for creating a `TestEntityWithSharedEntityType1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithSharedEntityType1`.
   */
  create(
    entity: TestEntityWithSharedEntityType1
  ): CreateRequestBuilder<TestEntityWithSharedEntityType1> {
    return new CreateRequestBuilder(TestEntityWithSharedEntityType1, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityWithSharedEntityType1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithSharedEntityType1`.
   */
  update(
    entity: TestEntityWithSharedEntityType1
  ): UpdateRequestBuilder<TestEntityWithSharedEntityType1> {
    return new UpdateRequestBuilder(TestEntityWithSharedEntityType1, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithSharedEntityType1`.
   * @param keyProperty Key property. See [[TestEntityWithSharedEntityType1.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithSharedEntityType1`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilder<TestEntityWithSharedEntityType1>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithSharedEntityType1`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithSharedEntityType1` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityWithSharedEntityType1
  ): DeleteRequestBuilder<TestEntityWithSharedEntityType1>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityWithSharedEntityType1> {
    return new DeleteRequestBuilder(
      TestEntityWithSharedEntityType1,
      keyPropertyOrEntity instanceof TestEntityWithSharedEntityType1
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
