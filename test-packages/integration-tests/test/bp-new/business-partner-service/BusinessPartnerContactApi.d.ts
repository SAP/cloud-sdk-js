import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField, Link, OneToOneLink } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerContact } from './BusinessPartnerContact';
import { BusinessPartnerContactRequestBuilder } from './BusinessPartnerContactRequestBuilder';
import { BpContactToAddress } from './BpContactToAddress';
import { BpContactToAddressApi } from './BpContactToAddressApi';
import { BpContactToFuncAndDept } from './BpContactToFuncAndDept';
import { BpContactToFuncAndDeptApi } from './BpContactToFuncAndDeptApi';
export declare class BusinessPartnerContactApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<BusinessPartnerContact<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        BpContactToAddressApi<DeSerializersT>,
        BpContactToFuncAndDeptApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof BusinessPartnerContact;
    requestBuilder(): BusinessPartnerContactRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<BusinessPartnerContact<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<BusinessPartnerContact<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<BusinessPartnerContact<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toContactAddress]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_CONTACT_ADDRESS: Link<BusinessPartnerContact<DeSerializersT>, DeSerializersT, BpContactToAddress<DeSerializersT>>;
        /**
         * Static representation of the one-to-one navigation property [[toContactRelationship]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_CONTACT_RELATIONSHIP: OneToOneLink<BusinessPartnerContact<DeSerializersT>, DeSerializersT, BpContactToFuncAndDept<DeSerializersT>>;
        /**
     * Static representation of the [[relationshipNumber]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        RELATIONSHIP_NUMBER: EdmTypeField<BusinessPartnerContact<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[businessPartnerCompany]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_COMPANY: EdmTypeField<BusinessPartnerContact<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[businessPartnerPerson]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_PERSON: EdmTypeField<BusinessPartnerContact<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[validityEndDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALIDITY_END_DATE: OrderableEdmTypeField<BusinessPartnerContact<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', false, true>;
        /**
         * Static representation of the [[validityStartDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALIDITY_START_DATE: OrderableEdmTypeField<BusinessPartnerContact<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[isStandardRelationship]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_STANDARD_RELATIONSHIP: EdmTypeField<BusinessPartnerContact<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[relationshipCategory]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RELATIONSHIP_CATEGORY: EdmTypeField<BusinessPartnerContact<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=BusinessPartnerContactApi.d.ts.map
