/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  RequestBuilder,
  GetAllRequestBuilderV2,
  GetByKeyRequestBuilderV2,
  CreateRequestBuilderV2,
  UpdateRequestBuilderV2,
  DeleteRequestBuilderV2
} from '@sap-cloud-sdk/core';
import { TestEntityLvl2MultiLink } from './TestEntityLvl2MultiLink';

/**
 * Request builder class for operations supported on the [[TestEntityLvl2MultiLink]] entity.
 */
export class TestEntityLvl2MultiLinkRequestBuilder extends RequestBuilder<TestEntityLvl2MultiLink> {
  /**
   * Returns a request builder for retrieving one `TestEntityLvl2MultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityLvl2MultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLvl2MultiLink` entity based on its keys.
   */
  getByKey(
    keyProperty: string
  ): GetByKeyRequestBuilderV2<TestEntityLvl2MultiLink> {
    return new GetByKeyRequestBuilderV2(TestEntityLvl2MultiLink, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityLvl2MultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl2MultiLink` entities.
   */
  getAll(): GetAllRequestBuilderV2<TestEntityLvl2MultiLink> {
    return new GetAllRequestBuilderV2(TestEntityLvl2MultiLink);
  }

  /**
   * Returns a request builder for creating a `TestEntityLvl2MultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl2MultiLink`.
   */
  create(
    entity: TestEntityLvl2MultiLink
  ): CreateRequestBuilderV2<TestEntityLvl2MultiLink> {
    return new CreateRequestBuilderV2(TestEntityLvl2MultiLink, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl2MultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl2MultiLink`.
   */
  update(
    entity: TestEntityLvl2MultiLink
  ): UpdateRequestBuilderV2<TestEntityLvl2MultiLink> {
    return new UpdateRequestBuilderV2(TestEntityLvl2MultiLink, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl2MultiLink`.
   * @param keyProperty Key property. See [[TestEntityLvl2MultiLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2MultiLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilderV2<TestEntityLvl2MultiLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl2MultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2MultiLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityLvl2MultiLink
  ): DeleteRequestBuilderV2<TestEntityLvl2MultiLink>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilderV2<TestEntityLvl2MultiLink> {
    return new DeleteRequestBuilderV2(
      TestEntityLvl2MultiLink,
      keyPropertyOrEntity instanceof TestEntityLvl2MultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
