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
} from '@sap-cloud-sdk/odata-v2';
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
  ): GetByKeyRequestBuilder<TestEntityCircularLinkChild> {
    return new GetByKeyRequestBuilder(TestEntityCircularLinkChild, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityCircularLinkChild` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkChild` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityCircularLinkChild> {
    return new GetAllRequestBuilder(TestEntityCircularLinkChild);
  }

  /**
   * Returns a request builder for creating a `TestEntityCircularLinkChild` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkChild`.
   */
  create(
    entity: TestEntityCircularLinkChild
  ): CreateRequestBuilder<TestEntityCircularLinkChild> {
    return new CreateRequestBuilder(TestEntityCircularLinkChild, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityCircularLinkChild`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityCircularLinkChild`.
   */
  update(
    entity: TestEntityCircularLinkChild
  ): UpdateRequestBuilder<TestEntityCircularLinkChild> {
    return new UpdateRequestBuilder(TestEntityCircularLinkChild, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityCircularLinkChild`.
   * @param keyProperty Key property. See [[TestEntityCircularLinkChild.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkChild`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilder<TestEntityCircularLinkChild>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityCircularLinkChild`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkChild` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityCircularLinkChild
  ): DeleteRequestBuilder<TestEntityCircularLinkChild>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityCircularLinkChild> {
    return new DeleteRequestBuilder(
      TestEntityCircularLinkChild,
      keyPropertyOrEntity instanceof TestEntityCircularLinkChild
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
