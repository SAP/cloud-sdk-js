import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { BpContactToFuncAndDept } from './BpContactToFuncAndDept';
import { BpContactToFuncAndDeptRequestBuilder } from './BpContactToFuncAndDeptRequestBuilder';
export declare class BpContactToFuncAndDeptApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<BpContactToFuncAndDept<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof BpContactToFuncAndDept;
    requestBuilder(): BpContactToFuncAndDeptRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<BpContactToFuncAndDept<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<BpContactToFuncAndDept<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[relationshipNumber]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        RELATIONSHIP_NUMBER: EdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[businessPartnerCompany]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_COMPANY: EdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[businessPartnerPerson]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_PERSON: EdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[validityEndDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALIDITY_END_DATE: OrderableEdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', false, true>;
        /**
         * Static representation of the [[contactPersonFunction]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONTACT_PERSON_FUNCTION: EdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[contactPersonDepartment]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONTACT_PERSON_DEPARTMENT: EdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[phoneNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PHONE_NUMBER: EdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[phoneNumberExtension]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PHONE_NUMBER_EXTENSION: EdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[faxNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FAX_NUMBER: EdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[faxNumberExtension]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FAX_NUMBER_EXTENSION: EdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[emailAddress]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EMAIL_ADDRESS: EdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[relationshipCategory]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RELATIONSHIP_CATEGORY: EdmTypeField<BpContactToFuncAndDept<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=BpContactToFuncAndDeptApi.d.ts.map
