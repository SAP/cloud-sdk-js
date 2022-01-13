import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { SupplierText } from './SupplierText';
import { SupplierTextRequestBuilder } from './SupplierTextRequestBuilder';
export declare class SupplierTextApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<SupplierText<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof SupplierText;
    requestBuilder(): SupplierTextRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<SupplierText<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<SupplierText<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<SupplierText<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[supplier]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        SUPPLIER: EdmTypeField<SupplierText<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[language]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LANGUAGE: EdmTypeField<SupplierText<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[longTextId]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LONG_TEXT_ID: EdmTypeField<SupplierText<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[longText]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LONG_TEXT: EdmTypeField<SupplierText<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=SupplierTextApi.d.ts.map
