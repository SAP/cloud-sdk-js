import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { CustomerTaxGrouping } from './CustomerTaxGrouping';
import { CustomerTaxGroupingRequestBuilder } from './CustomerTaxGroupingRequestBuilder';
export declare class CustomerTaxGroupingApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<CustomerTaxGrouping<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof CustomerTaxGrouping;
    requestBuilder(): CustomerTaxGroupingRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<CustomerTaxGrouping<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<CustomerTaxGrouping<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<CustomerTaxGrouping<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[customer]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        CUSTOMER: EdmTypeField<CustomerTaxGrouping<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[customerTaxGroupingCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_TAX_GROUPING_CODE: EdmTypeField<CustomerTaxGrouping<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[custTaxGrpExemptionCertificate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUST_TAX_GRP_EXEMPTION_CERTIFICATE: EdmTypeField<CustomerTaxGrouping<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[custTaxGroupExemptionRate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUST_TAX_GROUP_EXEMPTION_RATE: OrderableEdmTypeField<CustomerTaxGrouping<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Decimal', true, true>;
        /**
         * Static representation of the [[custTaxGroupExemptionStartDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUST_TAX_GROUP_EXEMPTION_START_DATE: OrderableEdmTypeField<CustomerTaxGrouping<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[custTaxGroupExemptionEndDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUST_TAX_GROUP_EXEMPTION_END_DATE: OrderableEdmTypeField<CustomerTaxGrouping<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[custTaxGroupSubjectedStartDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUST_TAX_GROUP_SUBJECTED_START_DATE: OrderableEdmTypeField<CustomerTaxGrouping<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[custTaxGroupSubjectedEndDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUST_TAX_GROUP_SUBJECTED_END_DATE: OrderableEdmTypeField<CustomerTaxGrouping<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
    };
}
// # sourceMappingURL=CustomerTaxGroupingApi.d.ts.map
