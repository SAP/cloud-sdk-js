import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { SupplierPurchasingOrgText } from './SupplierPurchasingOrgText';
import { SupplierPurchasingOrgTextRequestBuilder } from './SupplierPurchasingOrgTextRequestBuilder';
export declare class SupplierPurchasingOrgTextApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<SupplierPurchasingOrgText<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof SupplierPurchasingOrgText;
    requestBuilder(): SupplierPurchasingOrgTextRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<SupplierPurchasingOrgText<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<SupplierPurchasingOrgText<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<SupplierPurchasingOrgText<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[supplier]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        SUPPLIER: EdmTypeField<SupplierPurchasingOrgText<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[purchasingOrganization]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASING_ORGANIZATION: EdmTypeField<SupplierPurchasingOrgText<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[language]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LANGUAGE: EdmTypeField<SupplierPurchasingOrgText<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[longTextId]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LONG_TEXT_ID: EdmTypeField<SupplierPurchasingOrgText<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[longText]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LONG_TEXT: EdmTypeField<SupplierPurchasingOrgText<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=SupplierPurchasingOrgTextApi.d.ts.map
