/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
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
  getByKey(keyProperty: string): GetByKeyRequestBuilderV4<TestEntityEndsWith> {
    return new GetByKeyRequestBuilderV4(TestEntityEndsWith, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityEndsWith` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWith` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntityEndsWith> {
    return new GetAllRequestBuilderV4(TestEntityEndsWith);
  }

  /**
   * Returns a request builder for creating a `TestEntityEndsWith` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWith`.
   */
  create(
    entity: TestEntityEndsWith
  ): CreateRequestBuilderV4<TestEntityEndsWith> {
    return new CreateRequestBuilderV4(TestEntityEndsWith, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWith`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWith`.
   */
  update(
    entity: TestEntityEndsWith
  ): UpdateRequestBuilderV4<TestEntityEndsWith> {
    return new UpdateRequestBuilderV4(TestEntityEndsWith, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
   * @param keyProperty Key property. See [[TestEntityEndsWith.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith`.
   */
  delete(keyProperty: string): DeleteRequestBuilderV4<TestEntityEndsWith>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityEndsWith
  ): DeleteRequestBuilderV4<TestEntityEndsWith>;
  delete(keyPropertyOrEntity: any): DeleteRequestBuilderV4<TestEntityEndsWith> {
    return new DeleteRequestBuilderV4(
      TestEntityEndsWith,
      keyPropertyOrEntity instanceof TestEntityEndsWith
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
