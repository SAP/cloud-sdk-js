"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSalesAreaTax = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "A_CustomerSalesAreaTax" of service "API_BUSINESS_PARTNER".
 */
class CustomerSalesAreaTax extends odata_v2_1.Entity {
}
exports.CustomerSalesAreaTax = CustomerSalesAreaTax;
/**
 * Technical entity name for CustomerSalesAreaTax.
 */
CustomerSalesAreaTax._entityName = 'A_CustomerSalesAreaTax';
/**
 * Default url path for the according service.
 */
CustomerSalesAreaTax._defaultServicePath = '/sap/opu/odata/sap/API_BUSINESS_PARTNER';
/**
 * All key fields of the CustomerSalesAreaTax entity
 */
CustomerSalesAreaTax._keys = ['Customer', 'SalesOrganization', 'DistributionChannel', 'Division', 'DepartureCountry', 'CustomerTaxCategory'];
//# sourceMappingURL=CustomerSalesAreaTax.js.map