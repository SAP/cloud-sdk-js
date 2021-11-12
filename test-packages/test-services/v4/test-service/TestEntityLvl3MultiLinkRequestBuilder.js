'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityLvl3MultiLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const TestEntityLvl3MultiLink_1 = require('./TestEntityLvl3MultiLink');
/**
 * Request builder class for operations supported on the [[TestEntityLvl3MultiLink]] entity.
 */
class TestEntityLvl3MultiLinkRequestBuilder extends odata_common_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityLvl3MultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityLvl3MultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLvl3MultiLink` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v4_1.GetByKeyRequestBuilder(
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityLvl3MultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl3MultiLink` entities.
   */
  getAll() {
    return new odata_v4_1.GetAllRequestBuilder(
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityLvl3MultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl3MultiLink`.
   */
  create(entity) {
    return new odata_v4_1.CreateRequestBuilder(
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl3MultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl3MultiLink`.
   */
  update(entity) {
    return new odata_v4_1.UpdateRequestBuilder(
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new odata_v4_1.DeleteRequestBuilder(
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink,
      keyPropertyOrEntity instanceof
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityLvl3MultiLinkRequestBuilder =
  TestEntityLvl3MultiLinkRequestBuilder;
//# sourceMappingURL=TestEntityLvl3MultiLinkRequestBuilder.js.map
