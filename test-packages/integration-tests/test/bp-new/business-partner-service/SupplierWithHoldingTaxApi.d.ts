import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { SupplierWithHoldingTax } from './SupplierWithHoldingTax';
import { SupplierWithHoldingTaxRequestBuilder } from './SupplierWithHoldingTaxRequestBuilder';
export declare class SupplierWithHoldingTaxApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<SupplierWithHoldingTax<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof SupplierWithHoldingTax;
    requestBuilder(): SupplierWithHoldingTaxRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<SupplierWithHoldingTax<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<SupplierWithHoldingTax<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[supplier]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        SUPPLIER: EdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[companyCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_CODE: EdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[withholdingTaxType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_TYPE: EdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[exemptionDateBegin]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EXEMPTION_DATE_BEGIN: OrderableEdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[exemptionDateEnd]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EXEMPTION_DATE_END: OrderableEdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[exemptionReason]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EXEMPTION_REASON: EdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[isWithholdingTaxSubject]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_WITHHOLDING_TAX_SUBJECT: EdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[recipientType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RECIPIENT_TYPE: EdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[withholdingTaxCertificate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_CERTIFICATE: EdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[withholdingTaxCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_CODE: EdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[withholdingTaxExmptPercent]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_EXMPT_PERCENT: OrderableEdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Decimal', true, true>;
        /**
         * Static representation of the [[withholdingTaxNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_NUMBER: EdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<SupplierWithHoldingTax<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=SupplierWithHoldingTaxApi.d.ts.map
