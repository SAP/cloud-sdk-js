/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { AddressHomePageUrlRequestBuilder } from './AddressHomePageUrlRequestBuilder';
import { AddressHomePageUrl } from './AddressHomePageUrl';
export class AddressHomePageUrlApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      AddressHomePageUrl<
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

  entityConstructor = AddressHomePageUrl;

  requestBuilder(): AddressHomePageUrlRequestBuilder<
    DeSerializersT
  > {
    return new AddressHomePageUrlRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    AddressHomePageUrl<
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
  AddressHomePageUrl<
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
    const fieldBuilder = new FieldBuilder(AddressHomePageUrl, this.deSerializers);
    return {
    /**
 * Static representation of the [[addressId]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ADDRESS_ID: fieldBuilder.buildEdmTypeField('AddressID', 'Edm.String', false),
/**
 * Static representation of the [[person]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PERSON: fieldBuilder.buildEdmTypeField('Person', 'Edm.String', false),
/**
 * Static representation of the [[ordinalNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ORDINAL_NUMBER: fieldBuilder.buildEdmTypeField('OrdinalNumber', 'Edm.String', false),
/**
 * Static representation of the [[validityStartDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('ValidityStartDate', 'Edm.DateTime', false),
/**
 * Static representation of the [[isDefaultUrlAddress]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_DEFAULT_URL_ADDRESS: fieldBuilder.buildEdmTypeField('IsDefaultURLAddress', 'Edm.Boolean', false),
/**
 * Static representation of the [[searchUrlAddress]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SEARCH_URL_ADDRESS: fieldBuilder.buildEdmTypeField('SearchURLAddress', 'Edm.String', true),
/**
 * Static representation of the [[addressCommunicationRemarkText]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ADDRESS_COMMUNICATION_REMARK_TEXT: fieldBuilder.buildEdmTypeField('AddressCommunicationRemarkText', 'Edm.String', true),
/**
 * Static representation of the [[urlFieldLength]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
URL_FIELD_LENGTH: fieldBuilder.buildEdmTypeField('URLFieldLength', 'Edm.Int16', true),
/**
 * Static representation of the [[websiteUrl]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
WEBSITE_URL: fieldBuilder.buildEdmTypeField('WebsiteURL', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', AddressHomePageUrl)
  };
  }
}
