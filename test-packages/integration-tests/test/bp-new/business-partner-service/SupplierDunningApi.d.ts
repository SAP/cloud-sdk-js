import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { SupplierDunning } from './SupplierDunning';
import { SupplierDunningRequestBuilder } from './SupplierDunningRequestBuilder';
export declare class SupplierDunningApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<SupplierDunning<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof SupplierDunning;
    requestBuilder(): SupplierDunningRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<SupplierDunning<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<SupplierDunning<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[supplier]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        SUPPLIER: EdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[companyCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_CODE: EdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[dunningArea]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_AREA: EdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[dunningBlock]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_BLOCK: EdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[dunningLevel]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_LEVEL: EdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[dunningProcedure]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_PROCEDURE: EdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[dunningRecipient]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_RECIPIENT: EdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[lastDunnedOn]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_DUNNED_ON: OrderableEdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[legDunningProcedureOn]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LEG_DUNNING_PROCEDURE_ON: OrderableEdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[dunningClerk]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUNNING_CLERK: EdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierAccountGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_ACCOUNT_GROUP: EdmTypeField<SupplierDunning<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=SupplierDunningApi.d.ts.map
