import { Casetest_1 } from './Casetest_1';
import { Casetest_1RequestBuilder } from './Casetest_1RequestBuilder';
import { CustomField, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import { EdmTypeField, AllFields, EntityBuilderType, EntityApi } from '@sap-cloud-sdk/odata-common/internal';
export declare class Casetest_1Api<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<Casetest_1<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof Casetest_1;
    requestBuilder(): Casetest_1RequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<Casetest_1<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<Casetest_1<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<Casetest_1<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        KEY_PROPERTY_STRING: EdmTypeField<Casetest_1<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", false, true>;
    };
}
//# sourceMappingURL=Casetest_1Api.d.ts.map