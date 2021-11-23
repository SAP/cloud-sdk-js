/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder } from '@sap-cloud-sdk/odata-common/internal';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntityCircularLinkParent } from './TestEntityCircularLinkParent';

/**
 * Request builder class for operations supported on the [[TestEntityCircularLinkParent]] entity.
 */
export class TestEntityCircularLinkParentRequestBuilder extends RequestBuilder<TestEntityCircularLinkParent> {
  /**
   * Returns a request builder for retrieving one `TestEntityCircularLinkParent` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityCircularLinkParent.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityCircularLinkParent` entity based on its keys.
   */
  getByKey(
    keyProperty: string
  ): GetByKeyRequestBuilder<TestEntityCircularLinkParent> {
    return new GetByKeyRequestBuilder(TestEntityCircularLinkParent, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityCircularLinkParent` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkParent` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityCircularLinkParent> {
    return new GetAllRequestBuilder(TestEntityCircularLinkParent);
  }

  /**
   * Returns a request builder for creating a `TestEntityCircularLinkParent` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkParent`.
   */
  create(
    entity: TestEntityCircularLinkParent
  ): CreateRequestBuilder<TestEntityCircularLinkParent> {
    return new CreateRequestBuilder(TestEntityCircularLinkParent, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityCircularLinkParent`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityCircularLinkParent`.
   */
  update(
    entity: TestEntityCircularLinkParent
  ): UpdateRequestBuilder<TestEntityCircularLinkParent> {
    return new UpdateRequestBuilder(TestEntityCircularLinkParent, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityCircularLinkParent`.
   * @param keyProperty Key property. See [[TestEntityCircularLinkParent.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkParent`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilder<TestEntityCircularLinkParent>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityCircularLinkParent`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkParent` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityCircularLinkParent
  ): DeleteRequestBuilder<TestEntityCircularLinkParent>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityCircularLinkParent> {
    return new DeleteRequestBuilder(
      TestEntityCircularLinkParent,
      keyPropertyOrEntity instanceof TestEntityCircularLinkParent
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
