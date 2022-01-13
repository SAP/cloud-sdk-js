import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, Link } from '@sap-cloud-sdk/odata-v2';
import { CustomerSalesArea } from './CustomerSalesArea';
import { CustomerSalesAreaRequestBuilder } from './CustomerSalesAreaRequestBuilder';
import { CustSalesPartnerFunc } from './CustSalesPartnerFunc';
import { CustSalesPartnerFuncApi } from './CustSalesPartnerFuncApi';
import { CustomerSalesAreaTax } from './CustomerSalesAreaTax';
import { CustomerSalesAreaTaxApi } from './CustomerSalesAreaTaxApi';
import { CustomerSalesAreaText } from './CustomerSalesAreaText';
import { CustomerSalesAreaTextApi } from './CustomerSalesAreaTextApi';
export declare class CustomerSalesAreaApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<CustomerSalesArea<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        CustSalesPartnerFuncApi<DeSerializersT>,
        CustomerSalesAreaTaxApi<DeSerializersT>,
        CustomerSalesAreaTextApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof CustomerSalesArea;
    requestBuilder(): CustomerSalesAreaRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<CustomerSalesArea<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<CustomerSalesArea<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toPartnerFunction]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_PARTNER_FUNCTION: Link<CustomerSalesArea<DeSerializersT>, DeSerializersT, CustSalesPartnerFunc<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toSalesAreaTax]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SALES_AREA_TAX: Link<CustomerSalesArea<DeSerializersT>, DeSerializersT, CustomerSalesAreaTax<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toSalesAreaText]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SALES_AREA_TEXT: Link<CustomerSalesArea<DeSerializersT>, DeSerializersT, CustomerSalesAreaText<DeSerializersT>>;
        /**
     * Static representation of the [[customer]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        CUSTOMER: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[salesOrganization]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_ORGANIZATION: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[distributionChannel]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DISTRIBUTION_CHANNEL: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[division]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DIVISION: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[accountByCustomer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACCOUNT_BY_CUSTOMER: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[billingIsBlockedForCustomer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BILLING_IS_BLOCKED_FOR_CUSTOMER: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[completeDeliveryIsDefined]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPLETE_DELIVERY_IS_DEFINED: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[currency]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CURRENCY: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerAbcClassification]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_ABC_CLASSIFICATION: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerAccountAssignmentGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_ACCOUNT_ASSIGNMENT_GROUP: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_GROUP: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerPaymentTerms]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_PAYMENT_TERMS: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerPriceGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_PRICE_GROUP: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerPricingProcedure]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_PRICING_PROCEDURE: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[deliveryIsBlockedForCustomer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELIVERY_IS_BLOCKED_FOR_CUSTOMER: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[deliveryPriority]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELIVERY_PRIORITY: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[incotermsClassification]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_CLASSIFICATION: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[incotermsLocation2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_LOCATION_2: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[incotermsVersion]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_VERSION: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[incotermsLocation1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_LOCATION_1: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[deletionIndicator]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELETION_INDICATOR: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[incotermsTransferLocation]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_TRANSFER_LOCATION: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[invoiceDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INVOICE_DATE: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[itemOrderProbabilityInPercent]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ITEM_ORDER_PROBABILITY_IN_PERCENT: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[orderCombinationIsAllowed]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORDER_COMBINATION_IS_ALLOWED: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[orderIsBlockedForCustomer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORDER_IS_BLOCKED_FOR_CUSTOMER: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[partialDeliveryIsAllowed]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PARTIAL_DELIVERY_IS_ALLOWED: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[priceListType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRICE_LIST_TYPE: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[salesGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_GROUP: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[salesOffice]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_OFFICE: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[shippingCondition]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SHIPPING_CONDITION: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplyingPlant]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLYING_PLANT: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[salesDistrict]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_DISTRICT: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[invoiceListSchedule]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INVOICE_LIST_SCHEDULE: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[exchangeRateType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EXCHANGE_RATE_TYPE: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[additionalCustomerGroup1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDITIONAL_CUSTOMER_GROUP_1: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[additionalCustomerGroup2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDITIONAL_CUSTOMER_GROUP_2: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[additionalCustomerGroup3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDITIONAL_CUSTOMER_GROUP_3: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[additionalCustomerGroup4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDITIONAL_CUSTOMER_GROUP_4: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[additionalCustomerGroup5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDITIONAL_CUSTOMER_GROUP_5: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[paymentGuaranteeProcedure]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_GUARANTEE_PROCEDURE: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerAccountGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_ACCOUNT_GROUP: EdmTypeField<CustomerSalesArea<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=CustomerSalesAreaApi.d.ts.map
