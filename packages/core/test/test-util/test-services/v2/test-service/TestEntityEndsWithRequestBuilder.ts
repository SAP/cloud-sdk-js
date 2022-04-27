/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
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
  getByKey(keyProperty: string): GetByKeyRequestBuilderV2<TestEntityEndsWith> {
    return new GetByKeyRequestBuilderV2(TestEntityEndsWith, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityEndsWith` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWith` entities.
   */
  getAll(): GetAllRequestBuilderV2<TestEntityEndsWith> {
    return new GetAllRequestBuilderV2(TestEntityEndsWith);
  }

  /**
   * Returns a request builder for creating a `TestEntityEndsWith` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWith`.
   */
  create(
    entity: TestEntityEndsWith
  ): CreateRequestBuilderV2<TestEntityEndsWith> {
    return new CreateRequestBuilderV2(TestEntityEndsWith, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWith`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWith`.
   */
  update(
    entity: TestEntityEndsWith
  ): UpdateRequestBuilderV2<TestEntityEndsWith> {
    return new UpdateRequestBuilderV2(TestEntityEndsWith, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
   * @param keyProperty Key property. See [[TestEntityEndsWith.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith`.
   */
  delete(keyProperty: string): DeleteRequestBuilderV2<TestEntityEndsWith>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityEndsWith
  ): DeleteRequestBuilderV2<TestEntityEndsWith>;
  delete(keyPropertyOrEntity: any): DeleteRequestBuilderV2<TestEntityEndsWith> {
    return new DeleteRequestBuilderV2(
      TestEntityEndsWith,
      keyPropertyOrEntity instanceof TestEntityEndsWith
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
