/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder } from '@sap-cloud-sdk/odata-common';
import { GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntityLvl3MultiLink } from './TestEntityLvl3MultiLink';

/**
 * Request builder class for operations supported on the [[TestEntityLvl3MultiLink]] entity.
 */
export class TestEntityLvl3MultiLinkRequestBuilder extends RequestBuilder<TestEntityLvl3MultiLink> {
  /**
   * Returns a request builder for retrieving one `TestEntityLvl3MultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityLvl3MultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLvl3MultiLink` entity based on its keys.
   */
  getByKey(keyProperty: string): GetByKeyRequestBuilder<TestEntityLvl3MultiLink> {
    return new GetByKeyRequestBuilder(TestEntityLvl3MultiLink, { KeyProperty: keyProperty });
  }

  /**
   * Returns a request builder for querying all `TestEntityLvl3MultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl3MultiLink` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityLvl3MultiLink> {
    return new GetAllRequestBuilder(TestEntityLvl3MultiLink);
  }

  /**
   * Returns a request builder for creating a `TestEntityLvl3MultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl3MultiLink`.
   */
  create(entity: TestEntityLvl3MultiLink): CreateRequestBuilder<TestEntityLvl3MultiLink> {
    return new CreateRequestBuilder(TestEntityLvl3MultiLink, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl3MultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl3MultiLink`.
   */
  update(entity: TestEntityLvl3MultiLink): UpdateRequestBuilder<TestEntityLvl3MultiLink> {
    return new UpdateRequestBuilder(TestEntityLvl3MultiLink, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl3MultiLink`.
   * @param keyProperty Key property. See [[TestEntityLvl3MultiLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl3MultiLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilder<TestEntityLvl3MultiLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl3MultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl3MultiLink` by taking the entity as a parameter.
   */
  delete(entity: TestEntityLvl3MultiLink): DeleteRequestBuilder<TestEntityLvl3MultiLink>;
  delete(keyPropertyOrEntity: any): DeleteRequestBuilder<TestEntityLvl3MultiLink> {
    return new DeleteRequestBuilder(TestEntityLvl3MultiLink, keyPropertyOrEntity instanceof TestEntityLvl3MultiLink ? keyPropertyOrEntity : { KeyProperty: keyPropertyOrEntity! });
  }
}
