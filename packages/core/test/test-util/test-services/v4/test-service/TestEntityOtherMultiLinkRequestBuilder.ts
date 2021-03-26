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
} from '../../../../../src';
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
  getByKey(
    keyProperty: string
  ): GetByKeyRequestBuilderV4<TestEntityOtherMultiLink> {
    return new GetByKeyRequestBuilderV4(TestEntityOtherMultiLink, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityOtherMultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityOtherMultiLink` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntityOtherMultiLink> {
    return new GetAllRequestBuilderV4(TestEntityOtherMultiLink);
  }

  /**
   * Returns a request builder for creating a `TestEntityOtherMultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityOtherMultiLink`.
   */
  create(
    entity: TestEntityOtherMultiLink
  ): CreateRequestBuilderV4<TestEntityOtherMultiLink> {
    return new CreateRequestBuilderV4(TestEntityOtherMultiLink, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityOtherMultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityOtherMultiLink`.
   */
  update(
    entity: TestEntityOtherMultiLink
  ): UpdateRequestBuilderV4<TestEntityOtherMultiLink> {
    return new UpdateRequestBuilderV4(TestEntityOtherMultiLink, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityOtherMultiLink`.
   * @param keyProperty Key property. See [[TestEntityOtherMultiLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityOtherMultiLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilderV4<TestEntityOtherMultiLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityOtherMultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityOtherMultiLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityOtherMultiLink
  ): DeleteRequestBuilderV4<TestEntityOtherMultiLink>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilderV4<TestEntityOtherMultiLink> {
    return new DeleteRequestBuilderV4(
      TestEntityOtherMultiLink,
      keyPropertyOrEntity instanceof TestEntityOtherMultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
