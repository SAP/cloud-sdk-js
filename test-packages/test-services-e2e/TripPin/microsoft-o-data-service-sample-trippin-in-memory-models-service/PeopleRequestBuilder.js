'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PeopleRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const People_1 = require('./People');
/**
 * Request builder class for operations supported on the [[People]] entity.
 */
class PeopleRequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `People` entity based on its keys.
   * @param userName Key property. See [[People.userName]].
   * @returns A request builder for creating requests to retrieve one `People` entity based on its keys.
   */
  getByKey(userName) {
    return new core_1.GetByKeyRequestBuilderV4(People_1.People, {
      UserName: userName
    });
  }
  /**
   * Returns a request builder for querying all `People` entities.
   * @returns A request builder for creating requests to retrieve all `People` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV4(People_1.People);
  }
  /**
   * Returns a request builder for creating a `People` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `People`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV4(People_1.People, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `People`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `People`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV4(People_1.People, entity);
  }
  delete(userNameOrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      People_1.People,
      userNameOrEntity instanceof People_1.People
        ? userNameOrEntity
        : { UserName: userNameOrEntity }
    );
  }
}
exports.PeopleRequestBuilder = PeopleRequestBuilder;
//# sourceMappingURL=PeopleRequestBuilder.js.map
