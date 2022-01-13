"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressFaxNumberRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const AddressFaxNumber_1 = require("./AddressFaxNumber");
/**
 * Request builder class for operations supported on the [[AddressFaxNumber]] entity.
 */
class AddressFaxNumberRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `AddressFaxNumber` entity based on its keys.
     * @param addressId Key property. See [[AddressFaxNumber.addressId]].
     * @param person Key property. See [[AddressFaxNumber.person]].
     * @param ordinalNumber Key property. See [[AddressFaxNumber.ordinalNumber]].
     * @returns A request builder for creating requests to retrieve one `AddressFaxNumber` entity based on its keys.
     */
    getByKey(addressId, person, ordinalNumber) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            AddressID: addressId,
            Person: person,
            OrdinalNumber: ordinalNumber
        });
    }
    /**
     * Returns a request builder for querying all `AddressFaxNumber` entities.
     * @returns A request builder for creating requests to retrieve all `AddressFaxNumber` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `AddressFaxNumber` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `AddressFaxNumber`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `AddressFaxNumber`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `AddressFaxNumber`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(addressIdOrEntity, person, ordinalNumber) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, addressIdOrEntity instanceof AddressFaxNumber_1.AddressFaxNumber ? addressIdOrEntity : {
            AddressID: addressIdOrEntity,
            Person: person,
            OrdinalNumber: ordinalNumber
        });
    }
}
exports.AddressFaxNumberRequestBuilder = AddressFaxNumberRequestBuilder;
//# sourceMappingURL=AddressFaxNumberRequestBuilder.js.map