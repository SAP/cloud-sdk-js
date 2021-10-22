/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder } from '@sap-cloud-sdk/odata-common';
import { GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { TestEntityOtherMultiLink } from './TestEntityOtherMultiLink';

/**
 * Request builder class for operations supported on the [[TestEntityOtherMultiLink]] entity.
 */
export class TestEntityOtherMultiLinkRequestBuilder extends RequestBuilder<TestEntityOtherMultiLink> {
  /**
   * Returns a request builder for retrieving one `TestEntityOtherMultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityOtherMultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityOtherMultiLink` entity based on its keys.
   */
  getByKey(keyProperty: string): GetByKeyRequestBuilder<TestEntityOtherMultiLink> {
    return new GetByKeyRequestBuilder(TestEntityOtherMultiLink, { KeyProperty: keyProperty });
  }

  /**
   * Returns a request builder for querying all `TestEntityOtherMultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityOtherMultiLink` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityOtherMultiLink> {
    return new GetAllRequestBuilder(TestEntityOtherMultiLink);
  }

  /**
   * Returns a request builder for creating a `TestEntityOtherMultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityOtherMultiLink`.
   */
  create(entity: TestEntityOtherMultiLink): CreateRequestBuilder<TestEntityOtherMultiLink> {
    return new CreateRequestBuilder(TestEntityOtherMultiLink, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityOtherMultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityOtherMultiLink`.
   */
  update(entity: TestEntityOtherMultiLink): UpdateRequestBuilder<TestEntityOtherMultiLink> {
    return new UpdateRequestBuilder(TestEntityOtherMultiLink, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityOtherMultiLink`.
   * @param keyProperty Key property. See [[TestEntityOtherMultiLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityOtherMultiLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilder<TestEntityOtherMultiLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityOtherMultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityOtherMultiLink` by taking the entity as a parameter.
   */
  delete(entity: TestEntityOtherMultiLink): DeleteRequestBuilder<TestEntityOtherMultiLink>;
  delete(keyPropertyOrEntity: any): DeleteRequestBuilder<TestEntityOtherMultiLink> {
    return new DeleteRequestBuilder(TestEntityOtherMultiLink, keyPropertyOrEntity instanceof TestEntityOtherMultiLink ? keyPropertyOrEntity : { KeyProperty: keyPropertyOrEntity! });
  }
}
