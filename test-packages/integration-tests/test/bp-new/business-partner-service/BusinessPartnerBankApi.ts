/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerBankRequestBuilder } from './BusinessPartnerBankRequestBuilder';
import { BusinessPartnerBank } from './BusinessPartnerBank';
export class BusinessPartnerBankApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      BusinessPartnerBank<
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

    };

  _addNavigationProperties(
      linkedApis: [

      ]): this {
        this.navigationPropertyFields = {

        };
        return this;
      }

  entityConstructor = BusinessPartnerBank;

  requestBuilder(): BusinessPartnerBankRequestBuilder<
    DeSerializersT
  > {
    return new BusinessPartnerBankRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    BusinessPartnerBank<
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
  BusinessPartnerBank<
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
    const fieldBuilder = new FieldBuilder(BusinessPartnerBank, this.deSerializers);
    return {
    /**
 * Static representation of the [[businessPartner]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
/**
 * Static representation of the [[bankIdentification]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BANK_IDENTIFICATION: fieldBuilder.buildEdmTypeField('BankIdentification', 'Edm.String', false),
/**
 * Static representation of the [[bankCountryKey]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BANK_COUNTRY_KEY: fieldBuilder.buildEdmTypeField('BankCountryKey', 'Edm.String', true),
/**
 * Static representation of the [[bankName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BANK_NAME: fieldBuilder.buildEdmTypeField('BankName', 'Edm.String', true),
/**
 * Static representation of the [[bankNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BANK_NUMBER: fieldBuilder.buildEdmTypeField('BankNumber', 'Edm.String', true),
/**
 * Static representation of the [[swiftCode]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SWIFT_CODE: fieldBuilder.buildEdmTypeField('SWIFTCode', 'Edm.String', true),
/**
 * Static representation of the [[bankControlKey]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BANK_CONTROL_KEY: fieldBuilder.buildEdmTypeField('BankControlKey', 'Edm.String', true),
/**
 * Static representation of the [[bankAccountHolderName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BANK_ACCOUNT_HOLDER_NAME: fieldBuilder.buildEdmTypeField('BankAccountHolderName', 'Edm.String', true),
/**
 * Static representation of the [[bankAccountName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BANK_ACCOUNT_NAME: fieldBuilder.buildEdmTypeField('BankAccountName', 'Edm.String', true),
/**
 * Static representation of the [[validityStartDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('ValidityStartDate', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[validityEndDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALIDITY_END_DATE: fieldBuilder.buildEdmTypeField('ValidityEndDate', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[iban]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IBAN: fieldBuilder.buildEdmTypeField('IBAN', 'Edm.String', true),
/**
 * Static representation of the [[ibanValidityStartDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IBAN_VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('IBANValidityStartDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[bankAccount]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BANK_ACCOUNT: fieldBuilder.buildEdmTypeField('BankAccount', 'Edm.String', true),
/**
 * Static representation of the [[bankAccountReferenceText]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BANK_ACCOUNT_REFERENCE_TEXT: fieldBuilder.buildEdmTypeField('BankAccountReferenceText', 'Edm.String', true),
/**
 * Static representation of the [[collectionAuthInd]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
COLLECTION_AUTH_IND: fieldBuilder.buildEdmTypeField('CollectionAuthInd', 'Edm.Boolean', true),
/**
 * Static representation of the [[cityName]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CITY_NAME: fieldBuilder.buildEdmTypeField('CityName', 'Edm.String', true),
/**
 * Static representation of the [[authorizationGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', BusinessPartnerBank)
  };
  }
}
