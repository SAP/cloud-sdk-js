import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { CustomerWithHoldingTax } from './CustomerWithHoldingTax';
import { CustomerWithHoldingTaxRequestBuilder } from './CustomerWithHoldingTaxRequestBuilder';
export declare class CustomerWithHoldingTaxApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<CustomerWithHoldingTax<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof CustomerWithHoldingTax;
    requestBuilder(): CustomerWithHoldingTaxRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<CustomerWithHoldingTax<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<CustomerWithHoldingTax<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[customer]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        CUSTOMER: EdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[companyCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_CODE: EdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[withholdingTaxType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_TYPE: EdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[withholdingTaxCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_CODE: EdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[withholdingTaxAgent]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_AGENT: EdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[obligationDateBegin]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        OBLIGATION_DATE_BEGIN: OrderableEdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[obligationDateEnd]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        OBLIGATION_DATE_END: OrderableEdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[withholdingTaxNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_NUMBER: EdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[withholdingTaxCertificate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_CERTIFICATE: EdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[withholdingTaxExmptPercent]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_EXMPT_PERCENT: OrderableEdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Decimal', true, true>;
        /**
         * Static representation of the [[exemptionDateBegin]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EXEMPTION_DATE_BEGIN: OrderableEdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[exemptionDateEnd]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EXEMPTION_DATE_END: OrderableEdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[exemptionReason]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EXEMPTION_REASON: EdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<CustomerWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=CustomerWithHoldingTaxApi.d.ts.map
