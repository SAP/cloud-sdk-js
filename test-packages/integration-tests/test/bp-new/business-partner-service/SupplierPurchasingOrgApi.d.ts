import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField, Link } from '@sap-cloud-sdk/odata-v2';
import { SupplierPurchasingOrg } from './SupplierPurchasingOrg';
import { SupplierPurchasingOrgRequestBuilder } from './SupplierPurchasingOrgRequestBuilder';
import { SupplierPartnerFunc } from './SupplierPartnerFunc';
import { SupplierPartnerFuncApi } from './SupplierPartnerFuncApi';
import { SupplierPurchasingOrgText } from './SupplierPurchasingOrgText';
import { SupplierPurchasingOrgTextApi } from './SupplierPurchasingOrgTextApi';
export declare class SupplierPurchasingOrgApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<SupplierPurchasingOrg<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        SupplierPartnerFuncApi<DeSerializersT>,
        SupplierPurchasingOrgTextApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof SupplierPurchasingOrg;
    requestBuilder(): SupplierPurchasingOrgRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<SupplierPurchasingOrg<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<SupplierPurchasingOrg<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toPartnerFunction]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_PARTNER_FUNCTION: Link<SupplierPurchasingOrg<DeSerializersT>, DeSerializersT, SupplierPartnerFunc<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toPurchasingOrgText]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_PURCHASING_ORG_TEXT: Link<SupplierPurchasingOrg<DeSerializersT>, DeSerializersT, SupplierPurchasingOrgText<DeSerializersT>>;
        /**
     * Static representation of the [[supplier]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        SUPPLIER: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[purchasingOrganization]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASING_ORGANIZATION: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[calculationSchemaGroupCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CALCULATION_SCHEMA_GROUP_CODE: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[deletionIndicator]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELETION_INDICATOR: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[incotermsClassification]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_CLASSIFICATION: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[incotermsTransferLocation]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_TRANSFER_LOCATION: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[incotermsVersion]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_VERSION: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[incotermsLocation1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_LOCATION_1: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[incotermsLocation2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_LOCATION_2: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[invoiceIsGoodsReceiptBased]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INVOICE_IS_GOODS_RECEIPT_BASED: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[materialPlannedDeliveryDurn]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MATERIAL_PLANNED_DELIVERY_DURN: OrderableEdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Decimal', true, true>;
        /**
         * Static representation of the [[minimumOrderAmount]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MINIMUM_ORDER_AMOUNT: OrderableEdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Decimal', true, true>;
        /**
         * Static representation of the [[paymentTerms]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_TERMS: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[pricingDateControl]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRICING_DATE_CONTROL: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[purOrdAutoGenerationIsAllowed]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PUR_ORD_AUTO_GENERATION_IS_ALLOWED: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[purchaseOrderCurrency]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASE_ORDER_CURRENCY: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[purchasingGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASING_GROUP: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[purchasingIsBlockedForSupplier]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASING_IS_BLOCKED_FOR_SUPPLIER: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[shippingCondition]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SHIPPING_CONDITION: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierAbcClassificationCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_ABC_CLASSIFICATION_CODE: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierPhoneNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_PHONE_NUMBER: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierRespSalesPersonName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_RESP_SALES_PERSON_NAME: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierConfirmationControlKey]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_CONFIRMATION_CONTROL_KEY: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[isOrderAcknRqd]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_ORDER_ACKN_RQD: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierAccountGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_ACCOUNT_GROUP: EdmTypeField<SupplierPurchasingOrg<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=SupplierPurchasingOrgApi.d.ts.map
