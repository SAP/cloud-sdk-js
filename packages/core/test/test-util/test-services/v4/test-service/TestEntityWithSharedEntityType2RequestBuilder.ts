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
} from '../../../../../src';
import { TestEntityWithSharedEntityType2 } from './TestEntityWithSharedEntityType2';

/**
 * Request builder class for operations supported on the [[TestEntityWithSharedEntityType2]] entity.
 */
export class TestEntityWithSharedEntityType2RequestBuilder extends RequestBuilder<TestEntityWithSharedEntityType2> {
  /**
   * Returns a request builder for retrieving one `TestEntityWithSharedEntityType2` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityWithSharedEntityType2.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityWithSharedEntityType2` entity based on its keys.
   */
  getByKey(
    keyProperty: string
  ): GetByKeyRequestBuilderV4<TestEntityWithSharedEntityType2> {
    return new GetByKeyRequestBuilderV4(TestEntityWithSharedEntityType2, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityWithSharedEntityType2` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithSharedEntityType2` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntityWithSharedEntityType2> {
    return new GetAllRequestBuilderV4(TestEntityWithSharedEntityType2);
  }

  /**
   * Returns a request builder for creating a `TestEntityWithSharedEntityType2` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithSharedEntityType2`.
   */
  create(
    entity: TestEntityWithSharedEntityType2
  ): CreateRequestBuilderV4<TestEntityWithSharedEntityType2> {
    return new CreateRequestBuilderV4(TestEntityWithSharedEntityType2, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityWithSharedEntityType2`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithSharedEntityType2`.
   */
  update(
    entity: TestEntityWithSharedEntityType2
  ): UpdateRequestBuilderV4<TestEntityWithSharedEntityType2> {
    return new UpdateRequestBuilderV4(TestEntityWithSharedEntityType2, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithSharedEntityType2`.
   * @param keyProperty Key property. See [[TestEntityWithSharedEntityType2.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithSharedEntityType2`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilderV4<TestEntityWithSharedEntityType2>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithSharedEntityType2`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithSharedEntityType2` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityWithSharedEntityType2
  ): DeleteRequestBuilderV4<TestEntityWithSharedEntityType2>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilderV4<TestEntityWithSharedEntityType2> {
    return new DeleteRequestBuilderV4(
      TestEntityWithSharedEntityType2,
      keyPropertyOrEntity instanceof TestEntityWithSharedEntityType2
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
