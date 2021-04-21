/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
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
import { TestEntitySharesEntityType2 } from './TestEntitySharesEntityType2';

/**
 * Request builder class for operations supported on the [[TestEntitySharesEntityType2]] entity.
 */
export class TestEntitySharesEntityType2RequestBuilder extends RequestBuilder<TestEntitySharesEntityType2> {
  /**
   * Returns a request builder for retrieving one `TestEntitySharesEntityType2` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntitySharesEntityType2.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntitySharesEntityType2` entity based on its keys.
   */
  getByKey(
    keyProperty: string
  ): GetByKeyRequestBuilderV2<TestEntitySharesEntityType2> {
    return new GetByKeyRequestBuilderV2(TestEntitySharesEntityType2, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntitySharesEntityType2` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntitySharesEntityType2` entities.
   */
  getAll(): GetAllRequestBuilderV2<TestEntitySharesEntityType2> {
    return new GetAllRequestBuilderV2(TestEntitySharesEntityType2);
  }

  /**
   * Returns a request builder for creating a `TestEntitySharesEntityType2` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntitySharesEntityType2`.
   */
  create(
    entity: TestEntitySharesEntityType2
  ): CreateRequestBuilderV2<TestEntitySharesEntityType2> {
    return new CreateRequestBuilderV2(TestEntitySharesEntityType2, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntitySharesEntityType2`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntitySharesEntityType2`.
   */
  update(
    entity: TestEntitySharesEntityType2
  ): UpdateRequestBuilderV2<TestEntitySharesEntityType2> {
    return new UpdateRequestBuilderV2(TestEntitySharesEntityType2, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntitySharesEntityType2`.
   * @param keyProperty Key property. See [[TestEntitySharesEntityType2.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntitySharesEntityType2`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilderV2<TestEntitySharesEntityType2>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntitySharesEntityType2`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntitySharesEntityType2` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntitySharesEntityType2
  ): DeleteRequestBuilderV2<TestEntitySharesEntityType2>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilderV2<TestEntitySharesEntityType2> {
    return new DeleteRequestBuilderV2(
      TestEntitySharesEntityType2,
      keyPropertyOrEntity instanceof TestEntitySharesEntityType2
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
