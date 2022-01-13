"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPartnerService = exports.businessPartnerService = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const AddressEmailAddressApi_1 = require("./AddressEmailAddressApi");
const AddressFaxNumberApi_1 = require("./AddressFaxNumberApi");
const AddressHomePageUrlApi_1 = require("./AddressHomePageUrlApi");
const AddressPhoneNumberApi_1 = require("./AddressPhoneNumberApi");
const BpContactToAddressApi_1 = require("./BpContactToAddressApi");
const BpContactToFuncAndDeptApi_1 = require("./BpContactToFuncAndDeptApi");
const BuPaAddressUsageApi_1 = require("./BuPaAddressUsageApi");
const BuPaIdentificationApi_1 = require("./BuPaIdentificationApi");
const BuPaIndustryApi_1 = require("./BuPaIndustryApi");
const BusinessPartnerApi_1 = require("./BusinessPartnerApi");
const BusinessPartnerAddressApi_1 = require("./BusinessPartnerAddressApi");
const BusinessPartnerBankApi_1 = require("./BusinessPartnerBankApi");
const BusinessPartnerContactApi_1 = require("./BusinessPartnerContactApi");
const BusinessPartnerRoleApi_1 = require("./BusinessPartnerRoleApi");
const BusinessPartnerTaxNumberApi_1 = require("./BusinessPartnerTaxNumberApi");
const CustomerApi_1 = require("./CustomerApi");
const CustomerCompanyApi_1 = require("./CustomerCompanyApi");
const CustomerCompanyTextApi_1 = require("./CustomerCompanyTextApi");
const CustomerDunningApi_1 = require("./CustomerDunningApi");
const CustomerSalesAreaApi_1 = require("./CustomerSalesAreaApi");
const CustomerSalesAreaTaxApi_1 = require("./CustomerSalesAreaTaxApi");
const CustomerSalesAreaTextApi_1 = require("./CustomerSalesAreaTextApi");
const CustomerTaxGroupingApi_1 = require("./CustomerTaxGroupingApi");
const CustomerTextApi_1 = require("./CustomerTextApi");
const CustomerUnloadingPointApi_1 = require("./CustomerUnloadingPointApi");
const CustomerWithHoldingTaxApi_1 = require("./CustomerWithHoldingTaxApi");
const CustSalesPartnerFuncApi_1 = require("./CustSalesPartnerFuncApi");
const SupplierApi_1 = require("./SupplierApi");
const SupplierCompanyApi_1 = require("./SupplierCompanyApi");
const SupplierCompanyTextApi_1 = require("./SupplierCompanyTextApi");
const SupplierDunningApi_1 = require("./SupplierDunningApi");
const SupplierPartnerFuncApi_1 = require("./SupplierPartnerFuncApi");
const SupplierPurchasingOrgApi_1 = require("./SupplierPurchasingOrgApi");
const SupplierPurchasingOrgTextApi_1 = require("./SupplierPurchasingOrgTextApi");
const SupplierTextApi_1 = require("./SupplierTextApi");
const SupplierWithHoldingTaxApi_1 = require("./SupplierWithHoldingTaxApi");
const BatchRequest_1 = require("./BatchRequest");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
function businessPartnerService(deSerializers = odata_v2_1.defaultDeSerializers) {
    return new BusinessPartnerService((0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers));
}
exports.businessPartnerService = businessPartnerService;
class BusinessPartnerService {
    constructor(deSerializers) {
        this.apis = {};
        this.deSerializers = deSerializers;
    }
    initApi(key, ctor) {
        if (!this.apis[key]) {
            this.apis[key] = new ctor(this.deSerializers);
        }
        return this.apis[key];
    }
    get addressEmailAddressApi() {
        return this.initApi('addressEmailAddressApi', AddressEmailAddressApi_1.AddressEmailAddressApi);
    }
    get addressFaxNumberApi() {
        return this.initApi('addressFaxNumberApi', AddressFaxNumberApi_1.AddressFaxNumberApi);
    }
    get addressHomePageUrlApi() {
        return this.initApi('addressHomePageUrlApi', AddressHomePageUrlApi_1.AddressHomePageUrlApi);
    }
    get addressPhoneNumberApi() {
        return this.initApi('addressPhoneNumberApi', AddressPhoneNumberApi_1.AddressPhoneNumberApi);
    }
    get bpContactToAddressApi() {
        const api = this.initApi('bpContactToAddressApi', BpContactToAddressApi_1.BpContactToAddressApi);
        const linkedApis = [
            this.initApi('addressEmailAddressApi', AddressEmailAddressApi_1.AddressEmailAddressApi),
            this.initApi('addressFaxNumberApi', AddressFaxNumberApi_1.AddressFaxNumberApi),
            this.initApi('addressPhoneNumberApi', AddressPhoneNumberApi_1.AddressPhoneNumberApi),
            this.initApi('addressPhoneNumberApi', AddressPhoneNumberApi_1.AddressPhoneNumberApi),
            this.initApi('addressHomePageUrlApi', AddressHomePageUrlApi_1.AddressHomePageUrlApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get bpContactToFuncAndDeptApi() {
        return this.initApi('bpContactToFuncAndDeptApi', BpContactToFuncAndDeptApi_1.BpContactToFuncAndDeptApi);
    }
    get buPaAddressUsageApi() {
        return this.initApi('buPaAddressUsageApi', BuPaAddressUsageApi_1.BuPaAddressUsageApi);
    }
    get buPaIdentificationApi() {
        return this.initApi('buPaIdentificationApi', BuPaIdentificationApi_1.BuPaIdentificationApi);
    }
    get buPaIndustryApi() {
        return this.initApi('buPaIndustryApi', BuPaIndustryApi_1.BuPaIndustryApi);
    }
    get businessPartnerApi() {
        const api = this.initApi('businessPartnerApi', BusinessPartnerApi_1.BusinessPartnerApi);
        const linkedApis = [
            this.initApi('buPaIdentificationApi', BuPaIdentificationApi_1.BuPaIdentificationApi),
            this.initApi('buPaIndustryApi', BuPaIndustryApi_1.BuPaIndustryApi),
            this.initApi('businessPartnerAddressApi', BusinessPartnerAddressApi_1.BusinessPartnerAddressApi),
            this.initApi('businessPartnerBankApi', BusinessPartnerBankApi_1.BusinessPartnerBankApi),
            this.initApi('businessPartnerContactApi', BusinessPartnerContactApi_1.BusinessPartnerContactApi),
            this.initApi('businessPartnerRoleApi', BusinessPartnerRoleApi_1.BusinessPartnerRoleApi),
            this.initApi('businessPartnerTaxNumberApi', BusinessPartnerTaxNumberApi_1.BusinessPartnerTaxNumberApi),
            this.initApi('customerApi', CustomerApi_1.CustomerApi),
            this.initApi('supplierApi', SupplierApi_1.SupplierApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get businessPartnerAddressApi() {
        const api = this.initApi('businessPartnerAddressApi', BusinessPartnerAddressApi_1.BusinessPartnerAddressApi);
        const linkedApis = [
            this.initApi('buPaAddressUsageApi', BuPaAddressUsageApi_1.BuPaAddressUsageApi),
            this.initApi('addressEmailAddressApi', AddressEmailAddressApi_1.AddressEmailAddressApi),
            this.initApi('addressFaxNumberApi', AddressFaxNumberApi_1.AddressFaxNumberApi),
            this.initApi('addressPhoneNumberApi', AddressPhoneNumberApi_1.AddressPhoneNumberApi),
            this.initApi('addressPhoneNumberApi', AddressPhoneNumberApi_1.AddressPhoneNumberApi),
            this.initApi('addressHomePageUrlApi', AddressHomePageUrlApi_1.AddressHomePageUrlApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get businessPartnerBankApi() {
        return this.initApi('businessPartnerBankApi', BusinessPartnerBankApi_1.BusinessPartnerBankApi);
    }
    get businessPartnerContactApi() {
        const api = this.initApi('businessPartnerContactApi', BusinessPartnerContactApi_1.BusinessPartnerContactApi);
        const linkedApis = [
            this.initApi('bpContactToAddressApi', BpContactToAddressApi_1.BpContactToAddressApi),
            this.initApi('bpContactToFuncAndDeptApi', BpContactToFuncAndDeptApi_1.BpContactToFuncAndDeptApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get businessPartnerRoleApi() {
        return this.initApi('businessPartnerRoleApi', BusinessPartnerRoleApi_1.BusinessPartnerRoleApi);
    }
    get businessPartnerTaxNumberApi() {
        return this.initApi('businessPartnerTaxNumberApi', BusinessPartnerTaxNumberApi_1.BusinessPartnerTaxNumberApi);
    }
    get customerApi() {
        const api = this.initApi('customerApi', CustomerApi_1.CustomerApi);
        const linkedApis = [
            this.initApi('customerCompanyApi', CustomerCompanyApi_1.CustomerCompanyApi),
            this.initApi('customerSalesAreaApi', CustomerSalesAreaApi_1.CustomerSalesAreaApi),
            this.initApi('customerTaxGroupingApi', CustomerTaxGroupingApi_1.CustomerTaxGroupingApi),
            this.initApi('customerTextApi', CustomerTextApi_1.CustomerTextApi),
            this.initApi('customerUnloadingPointApi', CustomerUnloadingPointApi_1.CustomerUnloadingPointApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get customerCompanyApi() {
        const api = this.initApi('customerCompanyApi', CustomerCompanyApi_1.CustomerCompanyApi);
        const linkedApis = [
            this.initApi('customerCompanyTextApi', CustomerCompanyTextApi_1.CustomerCompanyTextApi),
            this.initApi('customerDunningApi', CustomerDunningApi_1.CustomerDunningApi),
            this.initApi('customerWithHoldingTaxApi', CustomerWithHoldingTaxApi_1.CustomerWithHoldingTaxApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get customerCompanyTextApi() {
        return this.initApi('customerCompanyTextApi', CustomerCompanyTextApi_1.CustomerCompanyTextApi);
    }
    get customerDunningApi() {
        return this.initApi('customerDunningApi', CustomerDunningApi_1.CustomerDunningApi);
    }
    get customerSalesAreaApi() {
        const api = this.initApi('customerSalesAreaApi', CustomerSalesAreaApi_1.CustomerSalesAreaApi);
        const linkedApis = [
            this.initApi('custSalesPartnerFuncApi', CustSalesPartnerFuncApi_1.CustSalesPartnerFuncApi),
            this.initApi('customerSalesAreaTaxApi', CustomerSalesAreaTaxApi_1.CustomerSalesAreaTaxApi),
            this.initApi('customerSalesAreaTextApi', CustomerSalesAreaTextApi_1.CustomerSalesAreaTextApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get customerSalesAreaTaxApi() {
        return this.initApi('customerSalesAreaTaxApi', CustomerSalesAreaTaxApi_1.CustomerSalesAreaTaxApi);
    }
    get customerSalesAreaTextApi() {
        return this.initApi('customerSalesAreaTextApi', CustomerSalesAreaTextApi_1.CustomerSalesAreaTextApi);
    }
    get customerTaxGroupingApi() {
        return this.initApi('customerTaxGroupingApi', CustomerTaxGroupingApi_1.CustomerTaxGroupingApi);
    }
    get customerTextApi() {
        return this.initApi('customerTextApi', CustomerTextApi_1.CustomerTextApi);
    }
    get customerUnloadingPointApi() {
        return this.initApi('customerUnloadingPointApi', CustomerUnloadingPointApi_1.CustomerUnloadingPointApi);
    }
    get customerWithHoldingTaxApi() {
        return this.initApi('customerWithHoldingTaxApi', CustomerWithHoldingTaxApi_1.CustomerWithHoldingTaxApi);
    }
    get custSalesPartnerFuncApi() {
        return this.initApi('custSalesPartnerFuncApi', CustSalesPartnerFuncApi_1.CustSalesPartnerFuncApi);
    }
    get supplierApi() {
        const api = this.initApi('supplierApi', SupplierApi_1.SupplierApi);
        const linkedApis = [
            this.initApi('supplierCompanyApi', SupplierCompanyApi_1.SupplierCompanyApi),
            this.initApi('supplierPurchasingOrgApi', SupplierPurchasingOrgApi_1.SupplierPurchasingOrgApi),
            this.initApi('supplierTextApi', SupplierTextApi_1.SupplierTextApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get supplierCompanyApi() {
        const api = this.initApi('supplierCompanyApi', SupplierCompanyApi_1.SupplierCompanyApi);
        const linkedApis = [
            this.initApi('supplierCompanyTextApi', SupplierCompanyTextApi_1.SupplierCompanyTextApi),
            this.initApi('supplierApi', SupplierApi_1.SupplierApi),
            this.initApi('supplierDunningApi', SupplierDunningApi_1.SupplierDunningApi),
            this.initApi('supplierWithHoldingTaxApi', SupplierWithHoldingTaxApi_1.SupplierWithHoldingTaxApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get supplierCompanyTextApi() {
        return this.initApi('supplierCompanyTextApi', SupplierCompanyTextApi_1.SupplierCompanyTextApi);
    }
    get supplierDunningApi() {
        return this.initApi('supplierDunningApi', SupplierDunningApi_1.SupplierDunningApi);
    }
    get supplierPartnerFuncApi() {
        return this.initApi('supplierPartnerFuncApi', SupplierPartnerFuncApi_1.SupplierPartnerFuncApi);
    }
    get supplierPurchasingOrgApi() {
        const api = this.initApi('supplierPurchasingOrgApi', SupplierPurchasingOrgApi_1.SupplierPurchasingOrgApi);
        const linkedApis = [
            this.initApi('supplierPartnerFuncApi', SupplierPartnerFuncApi_1.SupplierPartnerFuncApi),
            this.initApi('supplierPurchasingOrgTextApi', SupplierPurchasingOrgTextApi_1.SupplierPurchasingOrgTextApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get supplierPurchasingOrgTextApi() {
        return this.initApi('supplierPurchasingOrgTextApi', SupplierPurchasingOrgTextApi_1.SupplierPurchasingOrgTextApi);
    }
    get supplierTextApi() {
        return this.initApi('supplierTextApi', SupplierTextApi_1.SupplierTextApi);
    }
    get supplierWithHoldingTaxApi() {
        return this.initApi('supplierWithHoldingTaxApi', SupplierWithHoldingTaxApi_1.SupplierWithHoldingTaxApi);
    }
    get batch() {
        return BatchRequest_1.batch;
    }
}
exports.BusinessPartnerService = BusinessPartnerService;
//# sourceMappingURL=service.js.map