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
  ): GetByKeyRequestBuilder<TestEntityLvl2MultiLink> {
    return new GetByKeyRequestBuilder(TestEntityLvl2MultiLink, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityLvl2MultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl2MultiLink` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityLvl2MultiLink> {
    return new GetAllRequestBuilder(TestEntityLvl2MultiLink);
  }

  /**
   * Returns a request builder for creating a `TestEntityLvl2MultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl2MultiLink`.
   */
  create(
    entity: TestEntityLvl2MultiLink
  ): CreateRequestBuilder<TestEntityLvl2MultiLink> {
    return new CreateRequestBuilder(TestEntityLvl2MultiLink, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl2MultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl2MultiLink`.
   */
  update(
    entity: TestEntityLvl2MultiLink
  ): UpdateRequestBuilder<TestEntityLvl2MultiLink> {
    return new UpdateRequestBuilder(TestEntityLvl2MultiLink, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl2MultiLink`.
   * @param keyProperty Key property. See [[TestEntityLvl2MultiLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2MultiLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilder<TestEntityLvl2MultiLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl2MultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2MultiLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityLvl2MultiLink
  ): DeleteRequestBuilder<TestEntityLvl2MultiLink>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityLvl2MultiLink> {
    return new DeleteRequestBuilder(
      TestEntityLvl2MultiLink,
      keyPropertyOrEntity instanceof TestEntityLvl2MultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
