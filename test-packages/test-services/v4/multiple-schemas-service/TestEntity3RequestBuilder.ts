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
import { TestEntity3 } from './TestEntity3';

/**
 * Request builder class for operations supported on the [[TestEntity3]] entity.
 */
export class TestEntity3RequestBuilder extends RequestBuilder<TestEntity3> {
  /**
   * Returns a request builder for retrieving one `TestEntity3` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity3.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity3` entity based on its keys.
   */
  getByKey(keyPropertyString: string): GetByKeyRequestBuilder<TestEntity3> {
    return new GetByKeyRequestBuilder(TestEntity3, {
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `TestEntity3` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity3` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntity3> {
    return new GetAllRequestBuilder(TestEntity3);
  }

  /**
   * Returns a request builder for creating a `TestEntity3` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity3`.
   */
  create(entity: TestEntity3): CreateRequestBuilder<TestEntity3> {
    return new CreateRequestBuilder(TestEntity3, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntity3`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity3`.
   */
  update(entity: TestEntity3): UpdateRequestBuilder<TestEntity3> {
    return new UpdateRequestBuilder(TestEntity3, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntity3`.
   * @param keyPropertyString Key property. See [[TestEntity3.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity3`.
   */
  delete(keyPropertyString: string): DeleteRequestBuilder<TestEntity3>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity3`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity3` by taking the entity as a parameter.
   */
  delete(entity: TestEntity3): DeleteRequestBuilder<TestEntity3>;
  delete(keyPropertyStringOrEntity: any): DeleteRequestBuilder<TestEntity3> {
    return new DeleteRequestBuilder(
      TestEntity3,
      keyPropertyStringOrEntity instanceof TestEntity3
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity! }
    );
  }
}
