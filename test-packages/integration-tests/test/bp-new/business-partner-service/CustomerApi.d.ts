import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField, Link } from '@sap-cloud-sdk/odata-v2';
import { Customer } from './Customer';
import { CustomerRequestBuilder } from './CustomerRequestBuilder';
import { CustomerCompany } from './CustomerCompany';
import { CustomerCompanyApi } from './CustomerCompanyApi';
import { CustomerSalesArea } from './CustomerSalesArea';
import { CustomerSalesAreaApi } from './CustomerSalesAreaApi';
import { CustomerTaxGrouping } from './CustomerTaxGrouping';
import { CustomerTaxGroupingApi } from './CustomerTaxGroupingApi';
import { CustomerText } from './CustomerText';
import { CustomerTextApi } from './CustomerTextApi';
import { CustomerUnloadingPoint } from './CustomerUnloadingPoint';
import { CustomerUnloadingPointApi } from './CustomerUnloadingPointApi';
export declare class CustomerApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<Customer<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        CustomerCompanyApi<DeSerializersT>,
        CustomerSalesAreaApi<DeSerializersT>,
        CustomerTaxGroupingApi<DeSerializersT>,
        CustomerTextApi<DeSerializersT>,
        CustomerUnloadingPointApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof Customer;
    requestBuilder(): CustomerRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<Customer<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<Customer<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toCustomerCompany]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_CUSTOMER_COMPANY: Link<Customer<DeSerializersT>, DeSerializersT, CustomerCompany<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toCustomerSalesArea]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_CUSTOMER_SALES_AREA: Link<Customer<DeSerializersT>, DeSerializersT, CustomerSalesArea<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toCustomerTaxGrouping]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_CUSTOMER_TAX_GROUPING: Link<Customer<DeSerializersT>, DeSerializersT, CustomerTaxGrouping<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toCustomerText]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_CUSTOMER_TEXT: Link<Customer<DeSerializersT>, DeSerializersT, CustomerText<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toCustomerUnloadingPoint]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_CUSTOMER_UNLOADING_POINT: Link<Customer<DeSerializersT>, DeSerializersT, CustomerUnloadingPoint<DeSerializersT>>;
        /**
     * Static representation of the [[customer]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        CUSTOMER: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[billingIsBlockedForCustomer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BILLING_IS_BLOCKED_FOR_CUSTOMER: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[createdByUser]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATED_BY_USER: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[creationDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATION_DATE: OrderableEdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[customerAccountGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_ACCOUNT_GROUP: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerClassification]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_CLASSIFICATION: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerFullName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_FULL_NAME: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_NAME: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[deliveryIsBlocked]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELIVERY_IS_BLOCKED: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[nfPartnerIsNaturalPerson]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        NF_PARTNER_IS_NATURAL_PERSON: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[orderIsBlockedForCustomer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORDER_IS_BLOCKED_FOR_CUSTOMER: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[postingIsBlocked]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        POSTING_IS_BLOCKED: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[supplier]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerCorporateGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_CORPORATE_GROUP: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[fiscalAddress]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FISCAL_ADDRESS: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[industry]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDUSTRY: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[industryCode1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDUSTRY_CODE_1: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[industryCode2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDUSTRY_CODE_2: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[industryCode3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDUSTRY_CODE_3: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[industryCode4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDUSTRY_CODE_4: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[industryCode5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDUSTRY_CODE_5: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[internationalLocationNumber1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTERNATIONAL_LOCATION_NUMBER_1: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[nielsenRegion]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        NIELSEN_REGION: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[responsibleType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RESPONSIBLE_TYPE: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumber1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_1: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumber2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_2: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumber3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_3: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumber4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_4: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumber5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_5: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumberType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_TYPE: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[vatRegistration]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAT_REGISTRATION: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[deletionIndicator]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELETION_INDICATOR: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[expressTrainStationName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EXPRESS_TRAIN_STATION_NAME: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[trainStationName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TRAIN_STATION_NAME: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[cityCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CITY_CODE: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[county]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COUNTY: EdmTypeField<Customer<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=CustomerApi.d.ts.map
