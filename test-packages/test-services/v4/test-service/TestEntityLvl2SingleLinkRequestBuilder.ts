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
import { TestEntityLvl2SingleLink } from './TestEntityLvl2SingleLink';

/**
 * Request builder class for operations supported on the [[TestEntityLvl2SingleLink]] entity.
 */
export class TestEntityLvl2SingleLinkRequestBuilder extends RequestBuilder<TestEntityLvl2SingleLink> {
  /**
   * Returns a request builder for retrieving one `TestEntityLvl2SingleLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityLvl2SingleLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLvl2SingleLink` entity based on its keys.
   */
  getByKey(
    keyProperty: string
  ): GetByKeyRequestBuilder<TestEntityLvl2SingleLink> {
    return new GetByKeyRequestBuilder(TestEntityLvl2SingleLink, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityLvl2SingleLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl2SingleLink` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityLvl2SingleLink> {
    return new GetAllRequestBuilder(TestEntityLvl2SingleLink);
  }

  /**
   * Returns a request builder for creating a `TestEntityLvl2SingleLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl2SingleLink`.
   */
  create(
    entity: TestEntityLvl2SingleLink
  ): CreateRequestBuilder<TestEntityLvl2SingleLink> {
    return new CreateRequestBuilder(TestEntityLvl2SingleLink, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl2SingleLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl2SingleLink`.
   */
  update(
    entity: TestEntityLvl2SingleLink
  ): UpdateRequestBuilder<TestEntityLvl2SingleLink> {
    return new UpdateRequestBuilder(TestEntityLvl2SingleLink, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl2SingleLink`.
   * @param keyProperty Key property. See [[TestEntityLvl2SingleLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2SingleLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilder<TestEntityLvl2SingleLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl2SingleLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2SingleLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityLvl2SingleLink
  ): DeleteRequestBuilder<TestEntityLvl2SingleLink>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<TestEntityLvl2SingleLink> {
    return new DeleteRequestBuilder(
      TestEntityLvl2SingleLink,
      keyPropertyOrEntity instanceof TestEntityLvl2SingleLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
