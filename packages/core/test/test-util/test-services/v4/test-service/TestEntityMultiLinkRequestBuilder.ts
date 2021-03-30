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
import { TestEntityMultiLink } from './TestEntityMultiLink';

/**
 * Request builder class for operations supported on the [[TestEntityMultiLink]] entity.
 */
export class TestEntityMultiLinkRequestBuilder extends RequestBuilder<TestEntityMultiLink> {
  /**
   * Returns a request builder for retrieving one `TestEntityMultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityMultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityMultiLink` entity based on its keys.
   */
  getByKey(keyProperty: string): GetByKeyRequestBuilderV4<TestEntityMultiLink> {
    return new GetByKeyRequestBuilderV4(TestEntityMultiLink, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityMultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityMultiLink` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntityMultiLink> {
    return new GetAllRequestBuilderV4(TestEntityMultiLink);
  }

  /**
   * Returns a request builder for creating a `TestEntityMultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityMultiLink`.
   */
  create(
    entity: TestEntityMultiLink
  ): CreateRequestBuilderV4<TestEntityMultiLink> {
    return new CreateRequestBuilderV4(TestEntityMultiLink, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityMultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityMultiLink`.
   */
  update(
    entity: TestEntityMultiLink
  ): UpdateRequestBuilderV4<TestEntityMultiLink> {
    return new UpdateRequestBuilderV4(TestEntityMultiLink, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityMultiLink`.
   * @param keyProperty Key property. See [[TestEntityMultiLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityMultiLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilderV4<TestEntityMultiLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityMultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityMultiLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityMultiLink
  ): DeleteRequestBuilderV4<TestEntityMultiLink>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilderV4<TestEntityMultiLink> {
    return new DeleteRequestBuilderV4(
      TestEntityMultiLink,
      keyPropertyOrEntity instanceof TestEntityMultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
