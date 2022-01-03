/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
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
import { TestEntityLink } from './TestEntityLink';

/**
 * Request builder class for operations supported on the [[TestEntityLink]] entity.
 */
export class TestEntityLinkRequestBuilder extends RequestBuilder<TestEntityLink> {
  /**
   * Returns a request builder for retrieving one `TestEntityLink` entity based on its keys.
   * @param keyTestEntityLink Key property. See [[TestEntityLink.keyTestEntityLink]].
   * @param keyToTestEntity Key property. See [[TestEntityLink.keyToTestEntity]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLink` entity based on its keys.
   */
  getByKey(
    keyTestEntityLink: number,
    keyToTestEntity: number
  ): GetByKeyRequestBuilderV4<TestEntityLink> {
    return new GetByKeyRequestBuilderV4(TestEntityLink, {
      KeyTestEntityLink: keyTestEntityLink,
      KeyToTestEntity: keyToTestEntity
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLink` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntityLink> {
    return new GetAllRequestBuilderV4(TestEntityLink);
  }

  /**
   * Returns a request builder for creating a `TestEntityLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLink`.
   */
  create(entity: TestEntityLink): CreateRequestBuilderV4<TestEntityLink> {
    return new CreateRequestBuilderV4(TestEntityLink, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLink`.
   */
  update(entity: TestEntityLink): UpdateRequestBuilderV4<TestEntityLink> {
    return new UpdateRequestBuilderV4(TestEntityLink, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityLink`.
   * @param keyTestEntityLink Key property. See [[TestEntityLink.keyTestEntityLink]].
   * @param keyToTestEntity Key property. See [[TestEntityLink.keyToTestEntity]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLink`.
   */
  delete(
    keyTestEntityLink: number,
    keyToTestEntity: number
  ): DeleteRequestBuilderV4<TestEntityLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLink` by taking the entity as a parameter.
   */
  delete(entity: TestEntityLink): DeleteRequestBuilderV4<TestEntityLink>;
  delete(
    keyTestEntityLinkOrEntity: any,
    keyToTestEntity?: number
  ): DeleteRequestBuilderV4<TestEntityLink> {
    return new DeleteRequestBuilderV4(
      TestEntityLink,
      keyTestEntityLinkOrEntity instanceof TestEntityLink
        ? keyTestEntityLinkOrEntity
        : {
            KeyTestEntityLink: keyTestEntityLinkOrEntity!,
            KeyToTestEntity: keyToTestEntity!
          }
    );
  }
}
