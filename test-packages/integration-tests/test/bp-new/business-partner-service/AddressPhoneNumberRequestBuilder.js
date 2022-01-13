"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressPhoneNumberRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const AddressPhoneNumber_1 = require("./AddressPhoneNumber");
/**
 * Request builder class for operations supported on the [[AddressPhoneNumber]] entity.
 */
class AddressPhoneNumberRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `AddressPhoneNumber` entity based on its keys.
     * @param addressId Key property. See [[AddressPhoneNumber.addressId]].
     * @param person Key property. See [[AddressPhoneNumber.person]].
     * @param ordinalNumber Key property. See [[AddressPhoneNumber.ordinalNumber]].
     * @returns A request builder for creating requests to retrieve one `AddressPhoneNumber` entity based on its keys.
     */
    getByKey(addressId, person, ordinalNumber) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            AddressID: addressId,
            Person: person,
            OrdinalNumber: ordinalNumber
        });
    }
    /**
     * Returns a request builder for querying all `AddressPhoneNumber` entities.
     * @returns A request builder for creating requests to retrieve all `AddressPhoneNumber` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `AddressPhoneNumber` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `AddressPhoneNumber`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `AddressPhoneNumber`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `AddressPhoneNumber`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(addressIdOrEntity, person, ordinalNumber) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, addressIdOrEntity instanceof AddressPhoneNumber_1.AddressPhoneNumber ? addressIdOrEntity : {
            AddressID: addressIdOrEntity,
            Person: person,
            OrdinalNumber: ordinalNumber
        });
    }
}
exports.AddressPhoneNumberRequestBuilder = AddressPhoneNumberRequestBuilder;
//# sourceMappingURL=AddressPhoneNumberRequestBuilder.js.map