/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder, Link, OneToOneLink } from '@sap-cloud-sdk/odata-v2';
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
export class BusinessPartnerApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      BusinessPartner<
        DeSerializersT
      >,
      DeSerializersT
    > {
  public deSerializers: DeSerializersT;

  constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {
      /**
       * Static representation of the one-to-many navigation property [[toBuPaIdentification]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_BU_PA_IDENTIFICATION: Link<
            BusinessPartner<DeSerializersT>,
            DeSerializersT,
            BuPaIdentification<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-many navigation property [[toBuPaIndustry]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_BU_PA_INDUSTRY: Link<
            BusinessPartner<DeSerializersT>,
            DeSerializersT,
            BuPaIndustry<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-many navigation property [[toBusinessPartnerAddress]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_BUSINESS_PARTNER_ADDRESS: Link<
            BusinessPartner<DeSerializersT>,
            DeSerializersT,
            BusinessPartnerAddress<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-many navigation property [[toBusinessPartnerBank]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_BUSINESS_PARTNER_BANK: Link<
            BusinessPartner<DeSerializersT>,
            DeSerializersT,
            BusinessPartnerBank<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-many navigation property [[toBusinessPartnerContact]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_BUSINESS_PARTNER_CONTACT: Link<
            BusinessPartner<DeSerializersT>,
            DeSerializersT,
            BusinessPartnerContact<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-many navigation property [[toBusinessPartnerRole]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_BUSINESS_PARTNER_ROLE: Link<
            BusinessPartner<DeSerializersT>,
            DeSerializersT,
            BusinessPartnerRole<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-many navigation property [[toBusinessPartnerTax]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_BUSINESS_PARTNER_TAX: Link<
            BusinessPartner<DeSerializersT>,
            DeSerializersT,
            BusinessPartnerTaxNumber<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-one navigation property [[toCustomer]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_CUSTOMER: OneToOneLink<
            BusinessPartner<DeSerializersT>,
            DeSerializersT,
            Customer<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-one navigation property [[toSupplier]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_SUPPLIER: OneToOneLink<
            BusinessPartner<DeSerializersT>,
            DeSerializersT,
            Supplier<DeSerializersT>
          >;
    };

  _addNavigationProperties(
      linkedApis: [
        BuPaIdentificationApi<DeSerializersT>,BuPaIndustryApi<DeSerializersT>,BusinessPartnerAddressApi<DeSerializersT>,BusinessPartnerBankApi<DeSerializersT>,BusinessPartnerContactApi<DeSerializersT>,BusinessPartnerRoleApi<DeSerializersT>,BusinessPartnerTaxNumberApi<DeSerializersT>,CustomerApi<DeSerializersT>,SupplierApi<DeSerializersT>
      ]): this {
        this.navigationPropertyFields = {
          TO_BU_PA_IDENTIFICATION: new Link(
              'to_BuPaIdentification',
              this,
              linkedApis[0]
            ),
          TO_BU_PA_INDUSTRY: new Link(
              'to_BuPaIndustry',
              this,
              linkedApis[1]
            ),
          TO_BUSINESS_PARTNER_ADDRESS: new Link(
              'to_BusinessPartnerAddress',
              this,
              linkedApis[2]
            ),
          TO_BUSINESS_PARTNER_BANK: new Link(
              'to_BusinessPartnerBank',
              this,
              linkedApis[3]
            ),
          TO_BUSINESS_PARTNER_CONTACT: new Link(
              'to_BusinessPartnerContact',
              this,
              linkedApis[4]
            ),
          TO_BUSINESS_PARTNER_ROLE: new Link(
              'to_BusinessPartnerRole',
              this,
              linkedApis[5]
            ),
          TO_BUSINESS_PARTNER_TAX: new Link(
              'to_BusinessPartnerTax',
              this,
              linkedApis[6]
            ),
          TO_CUSTOMER: new OneToOneLink(
              'to_Customer',
              this,
              linkedApis[7]
            ),
          TO_SUPPLIER: new OneToOneLink(
              'to_Supplier',
              this,
              linkedApis[8]
            )
        };
        return this;
      }

  entityConstructor = BusinessPartner;

  requestBuilder(): BusinessPartnerRequestBuilder<
    DeSerializersT
  > {
    return new BusinessPartnerRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    BusinessPartner<
      DeSerializersT
    >,
    DeSerializersT
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
  BusinessPartner<
      DeSerializersT>,
    DeSerializersT,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(BusinessPartner, this.deSerializers);
    return {
    /**
 * Static representation of the [[businessPartner]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
/**
 * Static representation of the [[customer]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', true),
/**
 * Static representation of the [[supplier]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SUPPLIER: fieldBuilder.buildEdmTypeField('Supplier', 'Edm.String', true),
/**
 * Static representation of the [[academicTitle]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ACADEMIC_TITLE: fieldBuilder.buildEdmTypeField('AcademicTitle', 'Edm.String', true),
/**
 * Static representation of the [[authorizationGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
/**
 * Static representation of the [[businessPartnerCategory]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_CATEGORY: fieldBuilder.buildEdmTypeField('BusinessPartnerCategory', 'Edm.String', true),
/**
 * Static representation of the [[businessPartnerFullName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_FULL_NAME: fieldBuilder.buildEdmTypeField('BusinessPartnerFullName', 'Edm.String', true),
/**
 * Static representation of the [[businessPartnerGrouping]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_GROUPING: fieldBuilder.buildEdmTypeField('BusinessPartnerGrouping', 'Edm.String', true),
/**
 * Static representation of the [[businessPartnerName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_NAME: fieldBuilder.buildEdmTypeField('BusinessPartnerName', 'Edm.String', true),
/**
 * Static representation of the [[businessPartnerUuid]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_UUID: fieldBuilder.buildEdmTypeField('BusinessPartnerUUID', 'Edm.Guid', true),
/**
 * Static representation of the [[correspondenceLanguage]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CORRESPONDENCE_LANGUAGE: fieldBuilder.buildEdmTypeField('CorrespondenceLanguage', 'Edm.String', true),
/**
 * Static representation of the [[createdByUser]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CREATED_BY_USER: fieldBuilder.buildEdmTypeField('CreatedByUser', 'Edm.String', true),
/**
 * Static representation of the [[creationDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CREATION_DATE: fieldBuilder.buildEdmTypeField('CreationDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[creationTime]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CREATION_TIME: fieldBuilder.buildEdmTypeField('CreationTime', 'Edm.Time', true),
/**
 * Static representation of the [[firstName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
FIRST_NAME: fieldBuilder.buildEdmTypeField('FirstName', 'Edm.String', true),
/**
 * Static representation of the [[formOfAddress]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
FORM_OF_ADDRESS: fieldBuilder.buildEdmTypeField('FormOfAddress', 'Edm.String', true),
/**
 * Static representation of the [[industry]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INDUSTRY: fieldBuilder.buildEdmTypeField('Industry', 'Edm.String', true),
/**
 * Static representation of the [[internationalLocationNumber1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INTERNATIONAL_LOCATION_NUMBER_1: fieldBuilder.buildEdmTypeField('InternationalLocationNumber1', 'Edm.String', true),
/**
 * Static representation of the [[internationalLocationNumber2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INTERNATIONAL_LOCATION_NUMBER_2: fieldBuilder.buildEdmTypeField('InternationalLocationNumber2', 'Edm.String', true),
/**
 * Static representation of the [[isFemale]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_FEMALE: fieldBuilder.buildEdmTypeField('IsFemale', 'Edm.Boolean', true),
/**
 * Static representation of the [[isMale]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_MALE: fieldBuilder.buildEdmTypeField('IsMale', 'Edm.Boolean', true),
/**
 * Static representation of the [[isNaturalPerson]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_NATURAL_PERSON: fieldBuilder.buildEdmTypeField('IsNaturalPerson', 'Edm.String', true),
/**
 * Static representation of the [[isSexUnknown]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_SEX_UNKNOWN: fieldBuilder.buildEdmTypeField('IsSexUnknown', 'Edm.Boolean', true),
/**
 * Static representation of the [[genderCodeName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
GENDER_CODE_NAME: fieldBuilder.buildEdmTypeField('GenderCodeName', 'Edm.String', true),
/**
 * Static representation of the [[language]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LANGUAGE: fieldBuilder.buildEdmTypeField('Language', 'Edm.String', true),
/**
 * Static representation of the [[lastChangeDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LAST_CHANGE_DATE: fieldBuilder.buildEdmTypeField('LastChangeDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[lastChangeTime]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LAST_CHANGE_TIME: fieldBuilder.buildEdmTypeField('LastChangeTime', 'Edm.Time', true),
/**
 * Static representation of the [[lastChangedByUser]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LAST_CHANGED_BY_USER: fieldBuilder.buildEdmTypeField('LastChangedByUser', 'Edm.String', true),
/**
 * Static representation of the [[lastName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LAST_NAME: fieldBuilder.buildEdmTypeField('LastName', 'Edm.String', true),
/**
 * Static representation of the [[legalForm]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LEGAL_FORM: fieldBuilder.buildEdmTypeField('LegalForm', 'Edm.String', true),
/**
 * Static representation of the [[organizationBpName1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ORGANIZATION_BP_NAME_1: fieldBuilder.buildEdmTypeField('OrganizationBPName1', 'Edm.String', true),
/**
 * Static representation of the [[organizationBpName2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ORGANIZATION_BP_NAME_2: fieldBuilder.buildEdmTypeField('OrganizationBPName2', 'Edm.String', true),
/**
 * Static representation of the [[organizationBpName3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ORGANIZATION_BP_NAME_3: fieldBuilder.buildEdmTypeField('OrganizationBPName3', 'Edm.String', true),
/**
 * Static representation of the [[organizationBpName4]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ORGANIZATION_BP_NAME_4: fieldBuilder.buildEdmTypeField('OrganizationBPName4', 'Edm.String', true),
/**
 * Static representation of the [[organizationFoundationDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ORGANIZATION_FOUNDATION_DATE: fieldBuilder.buildEdmTypeField('OrganizationFoundationDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[organizationLiquidationDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ORGANIZATION_LIQUIDATION_DATE: fieldBuilder.buildEdmTypeField('OrganizationLiquidationDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[searchTerm1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SEARCH_TERM_1: fieldBuilder.buildEdmTypeField('SearchTerm1', 'Edm.String', true),
/**
 * Static representation of the [[searchTerm2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SEARCH_TERM_2: fieldBuilder.buildEdmTypeField('SearchTerm2', 'Edm.String', true),
/**
 * Static representation of the [[additionalLastName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ADDITIONAL_LAST_NAME: fieldBuilder.buildEdmTypeField('AdditionalLastName', 'Edm.String', true),
/**
 * Static representation of the [[birthDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BIRTH_DATE: fieldBuilder.buildEdmTypeField('BirthDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[businessPartnerBirthDateStatus]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_BIRTH_DATE_STATUS: fieldBuilder.buildEdmTypeField('BusinessPartnerBirthDateStatus', 'Edm.String', true),
/**
 * Static representation of the [[businessPartnerBirthplaceName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_BIRTHPLACE_NAME: fieldBuilder.buildEdmTypeField('BusinessPartnerBirthplaceName', 'Edm.String', true),
/**
 * Static representation of the [[businessPartnerDeathDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_DEATH_DATE: fieldBuilder.buildEdmTypeField('BusinessPartnerDeathDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[businessPartnerIsBlocked]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_IS_BLOCKED: fieldBuilder.buildEdmTypeField('BusinessPartnerIsBlocked', 'Edm.Boolean', true),
/**
 * Static representation of the [[businessPartnerType]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_TYPE: fieldBuilder.buildEdmTypeField('BusinessPartnerType', 'Edm.String', true),
/**
 * Static representation of the [[eTag]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
E_TAG: fieldBuilder.buildEdmTypeField('ETag', 'Edm.String', true),
/**
 * Static representation of the [[groupBusinessPartnerName1]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
GROUP_BUSINESS_PARTNER_NAME_1: fieldBuilder.buildEdmTypeField('GroupBusinessPartnerName1', 'Edm.String', true),
/**
 * Static representation of the [[groupBusinessPartnerName2]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
GROUP_BUSINESS_PARTNER_NAME_2: fieldBuilder.buildEdmTypeField('GroupBusinessPartnerName2', 'Edm.String', true),
/**
 * Static representation of the [[independentAddressId]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INDEPENDENT_ADDRESS_ID: fieldBuilder.buildEdmTypeField('IndependentAddressID', 'Edm.String', true),
/**
 * Static representation of the [[internationalLocationNumber3]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INTERNATIONAL_LOCATION_NUMBER_3: fieldBuilder.buildEdmTypeField('InternationalLocationNumber3', 'Edm.String', true),
/**
 * Static representation of the [[middleName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
MIDDLE_NAME: fieldBuilder.buildEdmTypeField('MiddleName', 'Edm.String', true),
/**
 * Static representation of the [[nameCountry]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
NAME_COUNTRY: fieldBuilder.buildEdmTypeField('NameCountry', 'Edm.String', true),
/**
 * Static representation of the [[nameFormat]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
NAME_FORMAT: fieldBuilder.buildEdmTypeField('NameFormat', 'Edm.String', true),
/**
 * Static representation of the [[personFullName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PERSON_FULL_NAME: fieldBuilder.buildEdmTypeField('PersonFullName', 'Edm.String', true),
/**
 * Static representation of the [[personNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PERSON_NUMBER: fieldBuilder.buildEdmTypeField('PersonNumber', 'Edm.String', true),
/**
 * Static representation of the [[isMarkedForArchiving]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_MARKED_FOR_ARCHIVING: fieldBuilder.buildEdmTypeField('IsMarkedForArchiving', 'Edm.Boolean', true),
/**
 * Static representation of the [[businessPartnerIdByExtSystem]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_ID_BY_EXT_SYSTEM: fieldBuilder.buildEdmTypeField('BusinessPartnerIDByExtSystem', 'Edm.String', true),
/**
 * Static representation of the [[tradingPartner]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
TRADING_PARTNER: fieldBuilder.buildEdmTypeField('TradingPartner', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', BusinessPartner)
  };
  }
}
