import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField, Link, OneToOneLink } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartner } from './BusinessPartner';
import { BusinessPartnerRequestBuilder } from './BusinessPartnerRequestBuilder';
import { BuPaIdentification } from './BuPaIdentification';
import { BuPaIdentificationApi } from './BuPaIdentificationApi';
import { BuPaIndustry } from './BuPaIndustry';
import { BuPaIndustryApi } from './BuPaIndustryApi';
import { BusinessPartnerAddress } from './BusinessPartnerAddress';
import { BusinessPartnerAddressApi } from './BusinessPartnerAddressApi';
import { BusinessPartnerBank } from './BusinessPartnerBank';
import { BusinessPartnerBankApi } from './BusinessPartnerBankApi';
import { BusinessPartnerContact } from './BusinessPartnerContact';
import { BusinessPartnerContactApi } from './BusinessPartnerContactApi';
import { BusinessPartnerRole } from './BusinessPartnerRole';
import { BusinessPartnerRoleApi } from './BusinessPartnerRoleApi';
import { BusinessPartnerTaxNumber } from './BusinessPartnerTaxNumber';
import { BusinessPartnerTaxNumberApi } from './BusinessPartnerTaxNumberApi';
import { Customer } from './Customer';
import { CustomerApi } from './CustomerApi';
import { Supplier } from './Supplier';
import { SupplierApi } from './SupplierApi';
export declare class BusinessPartnerApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<BusinessPartner<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        BuPaIdentificationApi<DeSerializersT>,
        BuPaIndustryApi<DeSerializersT>,
        BusinessPartnerAddressApi<DeSerializersT>,
        BusinessPartnerBankApi<DeSerializersT>,
        BusinessPartnerContactApi<DeSerializersT>,
        BusinessPartnerRoleApi<DeSerializersT>,
        BusinessPartnerTaxNumberApi<DeSerializersT>,
        CustomerApi<DeSerializersT>,
        SupplierApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof BusinessPartner;
    requestBuilder(): BusinessPartnerRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<BusinessPartner<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<BusinessPartner<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toBuPaIdentification]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_BU_PA_IDENTIFICATION: Link<BusinessPartner<DeSerializersT>, DeSerializersT, BuPaIdentification<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toBuPaIndustry]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_BU_PA_INDUSTRY: Link<BusinessPartner<DeSerializersT>, DeSerializersT, BuPaIndustry<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toBusinessPartnerAddress]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_BUSINESS_PARTNER_ADDRESS: Link<BusinessPartner<DeSerializersT>, DeSerializersT, BusinessPartnerAddress<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toBusinessPartnerBank]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_BUSINESS_PARTNER_BANK: Link<BusinessPartner<DeSerializersT>, DeSerializersT, BusinessPartnerBank<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toBusinessPartnerContact]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_BUSINESS_PARTNER_CONTACT: Link<BusinessPartner<DeSerializersT>, DeSerializersT, BusinessPartnerContact<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toBusinessPartnerRole]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_BUSINESS_PARTNER_ROLE: Link<BusinessPartner<DeSerializersT>, DeSerializersT, BusinessPartnerRole<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toBusinessPartnerTax]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_BUSINESS_PARTNER_TAX: Link<BusinessPartner<DeSerializersT>, DeSerializersT, BusinessPartnerTaxNumber<DeSerializersT>>;
        /**
         * Static representation of the one-to-one navigation property [[toCustomer]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_CUSTOMER: OneToOneLink<BusinessPartner<DeSerializersT>, DeSerializersT, Customer<DeSerializersT>>;
        /**
         * Static representation of the one-to-one navigation property [[toSupplier]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SUPPLIER: OneToOneLink<BusinessPartner<DeSerializersT>, DeSerializersT, Supplier<DeSerializersT>>;
        /**
     * Static representation of the [[businessPartner]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        BUSINESS_PARTNER: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[customer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplier]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[academicTitle]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACADEMIC_TITLE: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[businessPartnerCategory]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_CATEGORY: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[businessPartnerFullName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_FULL_NAME: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[businessPartnerGrouping]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_GROUPING: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[businessPartnerName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_NAME: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[businessPartnerUuid]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_UUID: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Guid', true, true>;
        /**
         * Static representation of the [[correspondenceLanguage]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CORRESPONDENCE_LANGUAGE: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[createdByUser]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATED_BY_USER: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[creationDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATION_DATE: OrderableEdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[creationTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATION_TIME: OrderableEdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[firstName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FIRST_NAME: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[formOfAddress]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FORM_OF_ADDRESS: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[industry]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDUSTRY: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[internationalLocationNumber1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTERNATIONAL_LOCATION_NUMBER_1: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[internationalLocationNumber2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTERNATIONAL_LOCATION_NUMBER_2: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[isFemale]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_FEMALE: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[isMale]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_MALE: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[isNaturalPerson]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_NATURAL_PERSON: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[isSexUnknown]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_SEX_UNKNOWN: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[genderCodeName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GENDER_CODE_NAME: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[language]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LANGUAGE: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[lastChangeDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_CHANGE_DATE: OrderableEdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[lastChangeTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_CHANGE_TIME: OrderableEdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[lastChangedByUser]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_CHANGED_BY_USER: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[lastName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_NAME: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[legalForm]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LEGAL_FORM: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[organizationBpName1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORGANIZATION_BP_NAME_1: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[organizationBpName2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORGANIZATION_BP_NAME_2: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[organizationBpName3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORGANIZATION_BP_NAME_3: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[organizationBpName4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORGANIZATION_BP_NAME_4: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[organizationFoundationDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORGANIZATION_FOUNDATION_DATE: OrderableEdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[organizationLiquidationDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORGANIZATION_LIQUIDATION_DATE: OrderableEdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[searchTerm1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SEARCH_TERM_1: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[searchTerm2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SEARCH_TERM_2: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[additionalLastName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDITIONAL_LAST_NAME: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[birthDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BIRTH_DATE: OrderableEdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[businessPartnerBirthDateStatus]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_BIRTH_DATE_STATUS: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[businessPartnerBirthplaceName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_BIRTHPLACE_NAME: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[businessPartnerDeathDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_DEATH_DATE: OrderableEdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[businessPartnerIsBlocked]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_IS_BLOCKED: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[businessPartnerType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_TYPE: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[eTag]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        E_TAG: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[groupBusinessPartnerName1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GROUP_BUSINESS_PARTNER_NAME_1: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[groupBusinessPartnerName2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GROUP_BUSINESS_PARTNER_NAME_2: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[independentAddressId]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDEPENDENT_ADDRESS_ID: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[internationalLocationNumber3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTERNATIONAL_LOCATION_NUMBER_3: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[middleName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MIDDLE_NAME: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[nameCountry]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        NAME_COUNTRY: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[nameFormat]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        NAME_FORMAT: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[personFullName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PERSON_FULL_NAME: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[personNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PERSON_NUMBER: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[isMarkedForArchiving]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_MARKED_FOR_ARCHIVING: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[businessPartnerIdByExtSystem]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_ID_BY_EXT_SYSTEM: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[tradingPartner]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TRADING_PARTNER: EdmTypeField<BusinessPartner<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=BusinessPartnerApi.d.ts.map
