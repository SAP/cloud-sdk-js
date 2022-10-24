"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlinesRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const Airlines_1 = require("./Airlines");
/**
 * Request builder class for operations supported on the {@link Airlines} entity.
 */
class AirlinesRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `Airlines` entity based on its keys.
     * @param airlineCode Key property. See {@link Airlines.airlineCode}.
     * @returns A request builder for creating requests to retrieve one `Airlines` entity based on its keys.
     */
    getByKey(airlineCode) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, { AirlineCode: airlineCode });
    }
    /**
     * Returns a request builder for querying all `Airlines` entities.
     * @returns A request builder for creating requests to retrieve all `Airlines` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `Airlines` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `Airlines`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `Airlines`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `Airlines`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(airlineCodeOrEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, airlineCodeOrEntity instanceof Airlines_1.Airlines ? airlineCodeOrEntity : { AirlineCode: airlineCodeOrEntity });
    }
}
exports.AirlinesRequestBuilder = AirlinesRequestBuilder;
//# sourceMappingURL=AirlinesRequestBuilder.js.map