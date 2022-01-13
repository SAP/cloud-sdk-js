"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierPurchasingOrgApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SupplierPurchasingOrg_1 = require("./SupplierPurchasingOrg");
const SupplierPurchasingOrgRequestBuilder_1 = require("./SupplierPurchasingOrgRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SupplierPurchasingOrgApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SupplierPurchasingOrg_1.SupplierPurchasingOrg;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_PARTNER_FUNCTION: new odata_v2_1.Link('to_PartnerFunction', this, linkedApis[0]),
            TO_PURCHASING_ORG_TEXT: new odata_v2_1.Link('to_PurchasingOrgText', this, linkedApis[1])
        };
        return this;
    }
    requestBuilder() {
        return new SupplierPurchasingOrgRequestBuilder_1.SupplierPurchasingOrgRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(SupplierPurchasingOrg_1.SupplierPurchasingOrg, this.deSerializers);
        return {
            /**
         * Static representation of the [[supplier]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            SUPPLIER: fieldBuilder.buildEdmTypeField('Supplier', 'Edm.String', false),
            /**
             * Static representation of the [[purchasingOrganization]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PURCHASING_ORGANIZATION: fieldBuilder.buildEdmTypeField('PurchasingOrganization', 'Edm.String', false),
            /**
             * Static representation of the [[calculationSchemaGroupCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CALCULATION_SCHEMA_GROUP_CODE: fieldBuilder.buildEdmTypeField('CalculationSchemaGroupCode', 'Edm.String', true),
            /**
             * Static representation of the [[deletionIndicator]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DELETION_INDICATOR: fieldBuilder.buildEdmTypeField('DeletionIndicator', 'Edm.Boolean', true),
            /**
             * Static representation of the [[incotermsClassification]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            INCOTERMS_CLASSIFICATION: fieldBuilder.buildEdmTypeField('IncotermsClassification', 'Edm.String', true),
            /**
             * Static representation of the [[incotermsTransferLocation]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            INCOTERMS_TRANSFER_LOCATION: fieldBuilder.buildEdmTypeField('IncotermsTransferLocation', 'Edm.String', true),
            /**
             * Static representation of the [[incotermsVersion]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            INCOTERMS_VERSION: fieldBuilder.buildEdmTypeField('IncotermsVersion', 'Edm.String', true),
            /**
             * Static representation of the [[incotermsLocation1]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            INCOTERMS_LOCATION_1: fieldBuilder.buildEdmTypeField('IncotermsLocation1', 'Edm.String', true),
            /**
             * Static representation of the [[incotermsLocation2]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            INCOTERMS_LOCATION_2: fieldBuilder.buildEdmTypeField('IncotermsLocation2', 'Edm.String', true),
            /**
             * Static representation of the [[invoiceIsGoodsReceiptBased]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            INVOICE_IS_GOODS_RECEIPT_BASED: fieldBuilder.buildEdmTypeField('InvoiceIsGoodsReceiptBased', 'Edm.Boolean', true),
            /**
             * Static representation of the [[materialPlannedDeliveryDurn]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            MATERIAL_PLANNED_DELIVERY_DURN: fieldBuilder.buildEdmTypeField('MaterialPlannedDeliveryDurn', 'Edm.Decimal', true),
            /**
             * Static representation of the [[minimumOrderAmount]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            MINIMUM_ORDER_AMOUNT: fieldBuilder.buildEdmTypeField('MinimumOrderAmount', 'Edm.Decimal', true),
            /**
             * Static representation of the [[paymentTerms]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PAYMENT_TERMS: fieldBuilder.buildEdmTypeField('PaymentTerms', 'Edm.String', true),
            /**
             * Static representation of the [[pricingDateControl]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PRICING_DATE_CONTROL: fieldBuilder.buildEdmTypeField('PricingDateControl', 'Edm.String', true),
            /**
             * Static representation of the [[purOrdAutoGenerationIsAllowed]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PUR_ORD_AUTO_GENERATION_IS_ALLOWED: fieldBuilder.buildEdmTypeField('PurOrdAutoGenerationIsAllowed', 'Edm.Boolean', true),
            /**
             * Static representation of the [[purchaseOrderCurrency]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PURCHASE_ORDER_CURRENCY: fieldBuilder.buildEdmTypeField('PurchaseOrderCurrency', 'Edm.String', true),
            /**
             * Static representation of the [[purchasingGroup]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PURCHASING_GROUP: fieldBuilder.buildEdmTypeField('PurchasingGroup', 'Edm.String', true),
            /**
             * Static representation of the [[purchasingIsBlockedForSupplier]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PURCHASING_IS_BLOCKED_FOR_SUPPLIER: fieldBuilder.buildEdmTypeField('PurchasingIsBlockedForSupplier', 'Edm.Boolean', true),
            /**
             * Static representation of the [[shippingCondition]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SHIPPING_CONDITION: fieldBuilder.buildEdmTypeField('ShippingCondition', 'Edm.String', true),
            /**
             * Static representation of the [[supplierAbcClassificationCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_ABC_CLASSIFICATION_CODE: fieldBuilder.buildEdmTypeField('SupplierABCClassificationCode', 'Edm.String', true),
            /**
             * Static representation of the [[supplierPhoneNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_PHONE_NUMBER: fieldBuilder.buildEdmTypeField('SupplierPhoneNumber', 'Edm.String', true),
            /**
             * Static representation of the [[supplierRespSalesPersonName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_RESP_SALES_PERSON_NAME: fieldBuilder.buildEdmTypeField('SupplierRespSalesPersonName', 'Edm.String', true),
            /**
             * Static representation of the [[supplierConfirmationControlKey]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_CONFIRMATION_CONTROL_KEY: fieldBuilder.buildEdmTypeField('SupplierConfirmationControlKey', 'Edm.String', true),
            /**
             * Static representation of the [[isOrderAcknRqd]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            IS_ORDER_ACKN_RQD: fieldBuilder.buildEdmTypeField('IsOrderAcknRqd', 'Edm.Boolean', true),
            /**
             * Static representation of the [[authorizationGroup]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
            /**
             * Static representation of the [[supplierAccountGroup]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_ACCOUNT_GROUP: fieldBuilder.buildEdmTypeField('SupplierAccountGroup', 'Edm.String', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', SupplierPurchasingOrg_1.SupplierPurchasingOrg)
        };
    }
}
exports.SupplierPurchasingOrgApi = SupplierPurchasingOrgApi;
//# sourceMappingURL=SupplierPurchasingOrgApi.js.map