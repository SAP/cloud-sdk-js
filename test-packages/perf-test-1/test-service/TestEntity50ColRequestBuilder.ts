/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, CreateRequestBuilderV4, UpdateRequestBuilderV4, DeleteRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntity50Col } from './TestEntity50Col';

/**
 * Request builder class for operations supported on the [[TestEntity50Col]] entity.
 */
export class TestEntity50ColRequestBuilder extends RequestBuilder<TestEntity50Col> {
  /**
   * Returns a request builder for retrieving one `TestEntity50Col` entity based on its keys.
   * @param keyTestEntity50Col Key property. See [[TestEntity50Col.keyTestEntity50Col]].
   * @returns A request builder for creating requests to retrieve one `TestEntity50Col` entity based on its keys.
   */
  getByKey(keyTestEntity50Col: number): GetByKeyRequestBuilderV4<TestEntity50Col> {
    return new GetByKeyRequestBuilderV4(TestEntity50Col, { KeyTestEntity50Col: keyTestEntity50Col });
  }

  /**
   * Returns a request builder for querying all `TestEntity50Col` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity50Col` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntity50Col> {
    return new GetAllRequestBuilderV4(TestEntity50Col);
  }

  /**
   * Returns a request builder for creating a `TestEntity50Col` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity50Col`.
   */
  create(entity: TestEntity50Col): CreateRequestBuilderV4<TestEntity50Col> {
    return new CreateRequestBuilderV4(TestEntity50Col, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntity50Col`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity50Col`.
   */
  update(entity: TestEntity50Col): UpdateRequestBuilderV4<TestEntity50Col> {
    return new UpdateRequestBuilderV4(TestEntity50Col, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntity50Col`.
   * @param keyTestEntity50Col Key property. See [[TestEntity50Col.keyTestEntity50Col]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity50Col`.
   */
  delete(keyTestEntity50Col: number): DeleteRequestBuilderV4<TestEntity50Col>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity50Col`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity50Col` by taking the entity as a parameter.
   */
  delete(entity: TestEntity50Col): DeleteRequestBuilderV4<TestEntity50Col>;
  delete(keyTestEntity50ColOrEntity: any): DeleteRequestBuilderV4<TestEntity50Col> {
    return new DeleteRequestBuilderV4(TestEntity50Col, keyTestEntity50ColOrEntity instanceof TestEntity50Col ? keyTestEntity50ColOrEntity : { KeyTestEntity50Col: keyTestEntity50ColOrEntity! });
  }
}
