/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  RequestBuilder,
  GetAllRequestBuilderV2,
  GetByKeyRequestBuilderV2,
  CreateRequestBuilderV2,
  UpdateRequestBuilderV2,
  DeleteRequestBuilderV2
} from '../../../../../src';
import { TestEntityEndsWithSomethingElse } from './TestEntityEndsWithSomethingElse';

/**
 * Request builder class for operations supported on the [[TestEntityEndsWithSomethingElse]] entity.
 */
export class TestEntityEndsWithSomethingElseRequestBuilder extends RequestBuilder<TestEntityEndsWithSomethingElse> {
  /**
   * Returns a request builder for retrieving one `TestEntityEndsWithSomethingElse` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityEndsWithSomethingElse.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityEndsWithSomethingElse` entity based on its keys.
   */
  getByKey(
    keyProperty: string
  ): GetByKeyRequestBuilderV2<TestEntityEndsWithSomethingElse> {
    return new GetByKeyRequestBuilderV2(TestEntityEndsWithSomethingElse, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityEndsWithSomethingElse` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWithSomethingElse` entities.
   */
  getAll(): GetAllRequestBuilderV2<TestEntityEndsWithSomethingElse> {
    return new GetAllRequestBuilderV2(TestEntityEndsWithSomethingElse);
  }

  /**
   * Returns a request builder for creating a `TestEntityEndsWithSomethingElse` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWithSomethingElse`.
   */
  create(
    entity: TestEntityEndsWithSomethingElse
  ): CreateRequestBuilderV2<TestEntityEndsWithSomethingElse> {
    return new CreateRequestBuilderV2(TestEntityEndsWithSomethingElse, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWithSomethingElse`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWithSomethingElse`.
   */
  update(
    entity: TestEntityEndsWithSomethingElse
  ): UpdateRequestBuilderV2<TestEntityEndsWithSomethingElse> {
    return new UpdateRequestBuilderV2(TestEntityEndsWithSomethingElse, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWithSomethingElse`.
   * @param keyProperty Key property. See [[TestEntityEndsWithSomethingElse.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWithSomethingElse`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilderV2<TestEntityEndsWithSomethingElse>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWithSomethingElse`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWithSomethingElse` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityEndsWithSomethingElse
  ): DeleteRequestBuilderV2<TestEntityEndsWithSomethingElse>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilderV2<TestEntityEndsWithSomethingElse> {
    return new DeleteRequestBuilderV2(
      TestEntityEndsWithSomethingElse,
      keyPropertyOrEntity instanceof TestEntityEndsWithSomethingElse
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
