/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
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
  getByKey(
    keyProperty: string
  ): GetByKeyRequestBuilderV4<TestEntityCircularLinkChild> {
    return new GetByKeyRequestBuilderV4(TestEntityCircularLinkChild, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityCircularLinkChild` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkChild` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntityCircularLinkChild> {
    return new GetAllRequestBuilderV4(TestEntityCircularLinkChild);
  }

  /**
   * Returns a request builder for creating a `TestEntityCircularLinkChild` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkChild`.
   */
  create(
    entity: TestEntityCircularLinkChild
  ): CreateRequestBuilderV4<TestEntityCircularLinkChild> {
    return new CreateRequestBuilderV4(TestEntityCircularLinkChild, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityCircularLinkChild`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityCircularLinkChild`.
   */
  update(
    entity: TestEntityCircularLinkChild
  ): UpdateRequestBuilderV4<TestEntityCircularLinkChild> {
    return new UpdateRequestBuilderV4(TestEntityCircularLinkChild, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityCircularLinkChild`.
   * @param keyProperty Key property. See [[TestEntityCircularLinkChild.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkChild`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilderV4<TestEntityCircularLinkChild>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityCircularLinkChild`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkChild` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityCircularLinkChild
  ): DeleteRequestBuilderV4<TestEntityCircularLinkChild>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilderV4<TestEntityCircularLinkChild> {
    return new DeleteRequestBuilderV4(
      TestEntityCircularLinkChild,
      keyPropertyOrEntity instanceof TestEntityCircularLinkChild
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
