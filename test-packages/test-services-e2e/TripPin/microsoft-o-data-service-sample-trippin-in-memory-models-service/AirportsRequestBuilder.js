"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirportsRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const Airports_1 = require("./Airports");
/**
 * Request builder class for operations supported on the {@link Airports} entity.
 */
class AirportsRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `Airports` entity based on its keys.
     * @param icaoCode Key property. See {@link Airports.icaoCode}.
     * @returns A request builder for creating requests to retrieve one `Airports` entity based on its keys.
     */
    getByKey(icaoCode) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, { IcaoCode: icaoCode });
    }
    /**
     * Returns a request builder for querying all `Airports` entities.
     * @returns A request builder for creating requests to retrieve all `Airports` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `Airports` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `Airports`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `Airports`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `Airports`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(icaoCodeOrEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, icaoCodeOrEntity instanceof Airports_1.Airports ? icaoCodeOrEntity : { IcaoCode: icaoCodeOrEntity });
    }
}
exports.AirportsRequestBuilder = AirportsRequestBuilder;
//# sourceMappingURL=AirportsRequestBuilder.js.map