/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder } from '../../../../../src/v4';
import { TestEntityOtherMultiLink } from './TestEntityOtherMultiLink';

/**
 * Request builder class for operations supported on the [[TestEntityOtherMultiLink]] entity.
 */
export class TestEntityOtherMultiLinkRequestBuilder extends RequestBuilder<TestEntityOtherMultiLink> {
  /**
   * Returns a request builder for retrieving one `TestEntityOtherMultiLink` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntityOtherMultiLink.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntityOtherMultiLink` entity based on its keys.
   */
  getByKey(keyPropertyString: string): GetByKeyRequestBuilder<TestEntityOtherMultiLink> {
    return new GetByKeyRequestBuilder(TestEntityOtherMultiLink, { KeyPropertyString: keyPropertyString });
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
   * @param keyPropertyString Key property. See [[TestEntityOtherMultiLink.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityOtherMultiLink`.
   */
  delete(keyPropertyString: string): DeleteRequestBuilder<TestEntityOtherMultiLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityOtherMultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityOtherMultiLink` by taking the entity as a parameter.
   */
  delete(entity: TestEntityOtherMultiLink): DeleteRequestBuilder<TestEntityOtherMultiLink>;
  delete(keyPropertyStringOrEntity: any): DeleteRequestBuilder<TestEntityOtherMultiLink> {
    return new DeleteRequestBuilder(TestEntityOtherMultiLink, keyPropertyStringOrEntity instanceof TestEntityOtherMultiLink ? keyPropertyStringOrEntity : { KeyPropertyString: keyPropertyStringOrEntity! });
  }
}
