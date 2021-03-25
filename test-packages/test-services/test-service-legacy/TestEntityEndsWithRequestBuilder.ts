/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntityEndsWith } from './TestEntityEndsWith';

/**
 * Request builder class for operations supported on the [[TestEntityEndsWith]] entity.
 */
export class TestEntityEndsWithRequestBuilder extends RequestBuilder<TestEntityEndsWith> {
  /**
   * Returns a request builder for retrieving one `TestEntityEndsWith` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityEndsWith.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityEndsWith` entity based on its keys.
   */
  getByKey(keyProperty: string): GetByKeyRequestBuilder<TestEntityEndsWith> {
    return new GetByKeyRequestBuilder(TestEntityEndsWith, { KeyProperty: keyProperty });
  }

  /**
   * Returns a request builder for querying all `TestEntityEndsWith` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWith` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityEndsWith> {
    return new GetAllRequestBuilder(TestEntityEndsWith);
  }

  /**
   * Returns a request builder for creating a `TestEntityEndsWith` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWith`.
   */
  create(entity: TestEntityEndsWith): CreateRequestBuilder<TestEntityEndsWith> {
    return new CreateRequestBuilder(TestEntityEndsWith, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWith`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWith`.
   */
  update(entity: TestEntityEndsWith): UpdateRequestBuilder<TestEntityEndsWith> {
    return new UpdateRequestBuilder(TestEntityEndsWith, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
   * @param keyProperty Key property. See [[TestEntityEndsWith.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith`.
   */
  delete(keyProperty: string): DeleteRequestBuilder<TestEntityEndsWith>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith` by taking the entity as a parameter.
   */
  delete(entity: TestEntityEndsWith): DeleteRequestBuilder<TestEntityEndsWith>;
  delete(keyPropertyOrEntity: any): DeleteRequestBuilder<TestEntityEndsWith> {
    return new DeleteRequestBuilder(TestEntityEndsWith, keyPropertyOrEntity instanceof TestEntityEndsWith ? keyPropertyOrEntity : { KeyProperty: keyPropertyOrEntity! });
  }
}
