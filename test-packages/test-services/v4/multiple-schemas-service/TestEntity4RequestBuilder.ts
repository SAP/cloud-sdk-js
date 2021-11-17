/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder } from '@sap-cloud-sdk/odata-common/internal';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntity4 } from './TestEntity4';

/**
 * Request builder class for operations supported on the [[TestEntity4]] entity.
 */
export class TestEntity4RequestBuilder extends RequestBuilder<TestEntity4> {
  /**
   * Returns a request builder for retrieving one `TestEntity4` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity4.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity4` entity based on its keys.
   */
  getByKey(keyPropertyString: string): GetByKeyRequestBuilder<TestEntity4> {
    return new GetByKeyRequestBuilder(TestEntity4, {
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `TestEntity4` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity4` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntity4> {
    return new GetAllRequestBuilder(TestEntity4);
  }

  /**
   * Returns a request builder for creating a `TestEntity4` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity4`.
   */
  create(entity: TestEntity4): CreateRequestBuilder<TestEntity4> {
    return new CreateRequestBuilder(TestEntity4, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntity4`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity4`.
   */
  update(entity: TestEntity4): UpdateRequestBuilder<TestEntity4> {
    return new UpdateRequestBuilder(TestEntity4, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntity4`.
   * @param keyPropertyString Key property. See [[TestEntity4.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity4`.
   */
  delete(keyPropertyString: string): DeleteRequestBuilder<TestEntity4>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity4`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity4` by taking the entity as a parameter.
   */
  delete(entity: TestEntity4): DeleteRequestBuilder<TestEntity4>;
  delete(keyPropertyStringOrEntity: any): DeleteRequestBuilder<TestEntity4> {
    return new DeleteRequestBuilder(
      TestEntity4,
      keyPropertyStringOrEntity instanceof TestEntity4
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity! }
    );
  }
}
