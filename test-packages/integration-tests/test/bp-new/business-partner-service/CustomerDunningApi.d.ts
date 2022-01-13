import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { CustomerDunning } from './CustomerDunning';
import { CustomerDunningRequestBuilder } from './CustomerDunningRequestBuilder';
export declare class CustomerDunningApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<CustomerDunning<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof CustomerDunning;
    requestBuilder(): CustomerDunningRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<CustomerDunning<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<CustomerDunning<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[customer]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        CUSTOMER: EdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[companyCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_CODE: EdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[dunningArea]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_AREA: EdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[dunningBlock]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_BLOCK: EdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[dunningLevel]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_LEVEL: EdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[dunningProcedure]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_PROCEDURE: EdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[dunningRecipient]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_RECIPIENT: EdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[lastDunnedOn]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_DUNNED_ON: OrderableEdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[legDunningProcedureOn]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LEG_DUNNING_PROCEDURE_ON: OrderableEdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[dunningClerk]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_CLERK: EdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerAccountGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_ACCOUNT_GROUP: EdmTypeField<CustomerDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=CustomerDunningApi.d.ts.map
