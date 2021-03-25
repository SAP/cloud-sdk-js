/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilderV2, GetByKeyRequestBuilderV2, CreateRequestBuilderV2, UpdateRequestBuilderV2, DeleteRequestBuilderV2 } from '../../../../../src';
import { TestEntityCircularLinkChild } from './TestEntityCircularLinkChild';

/**
 * Request builder class for operations supported on the [[TestEntityCircularLinkChild]] entity.
 */
export class TestEntityCircularLinkChildRequestBuilder extends RequestBuilder<TestEntityCircularLinkChild> {
  /**
   * Returns a request builder for retrieving one `TestEntityCircularLinkChild` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityCircularLinkChild.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityCircularLinkChild` entity based on its keys.
   */
  getByKey(keyProperty: string): GetByKeyRequestBuilderV2<TestEntityCircularLinkChild> {
    return new GetByKeyRequestBuilderV2(TestEntityCircularLinkChild, { KeyProperty: keyProperty });
  }

  /**
   * Returns a request builder for querying all `TestEntityCircularLinkChild` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkChild` entities.
   */
  getAll(): GetAllRequestBuilderV2<TestEntityCircularLinkChild> {
    return new GetAllRequestBuilderV2(TestEntityCircularLinkChild);
  }

  /**
   * Returns a request builder for creating a `TestEntityCircularLinkChild` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkChild`.
   */
  create(entity: TestEntityCircularLinkChild): CreateRequestBuilderV2<TestEntityCircularLinkChild> {
    return new CreateRequestBuilderV2(TestEntityCircularLinkChild, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityCircularLinkChild`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityCircularLinkChild`.
   */
  update(entity: TestEntityCircularLinkChild): UpdateRequestBuilderV2<TestEntityCircularLinkChild> {
    return new UpdateRequestBuilderV2(TestEntityCircularLinkChild, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityCircularLinkChild`.
   * @param keyProperty Key property. See [[TestEntityCircularLinkChild.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkChild`.
   */
  delete(keyProperty: string): DeleteRequestBuilderV2<TestEntityCircularLinkChild>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityCircularLinkChild`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkChild` by taking the entity as a parameter.
   */
  delete(entity: TestEntityCircularLinkChild): DeleteRequestBuilderV2<TestEntityCircularLinkChild>;
  delete(keyPropertyOrEntity: any): DeleteRequestBuilderV2<TestEntityCircularLinkChild> {
    return new DeleteRequestBuilderV2(TestEntityCircularLinkChild, keyPropertyOrEntity instanceof TestEntityCircularLinkChild ? keyPropertyOrEntity : { KeyProperty: keyPropertyOrEntity! });
  }
}
