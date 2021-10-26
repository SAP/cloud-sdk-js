'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AirlinesRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const Airlines_1 = require('./Airlines');
/**
 * Request builder class for operations supported on the [[Airlines]] entity.
 */
class AirlinesRequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `Airlines` entity based on its keys.
   * @param airlineCode Key property. See [[Airlines.airlineCode]].
   * @returns A request builder for creating requests to retrieve one `Airlines` entity based on its keys.
   */
  getByKey(airlineCode) {
    return new core_1.GetByKeyRequestBuilderV4(Airlines_1.Airlines, {
      AirlineCode: airlineCode
    });
  }
  /**
   * Returns a request builder for querying all `Airlines` entities.
   * @returns A request builder for creating requests to retrieve all `Airlines` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV4(Airlines_1.Airlines);
  }
  /**
   * Returns a request builder for creating a `Airlines` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Airlines`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV4(Airlines_1.Airlines, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `Airlines`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Airlines`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV4(Airlines_1.Airlines, entity);
  }
  delete(airlineCodeOrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      Airlines_1.Airlines,
      airlineCodeOrEntity instanceof Airlines_1.Airlines
        ? airlineCodeOrEntity
        : { AirlineCode: airlineCodeOrEntity }
    );
  }
}
exports.AirlinesRequestBuilder = AirlinesRequestBuilder;
//# sourceMappingURL=AirlinesRequestBuilder.js.map
