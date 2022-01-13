/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { AddressEmailAddressRequestBuilder } from './AddressEmailAddressRequestBuilder';
import { AddressEmailAddress } from './AddressEmailAddress';
export class AddressEmailAddressApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      AddressEmailAddress<
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

  entityConstructor = AddressEmailAddress;

  requestBuilder(): AddressEmailAddressRequestBuilder<
    DeSerializersT
  > {
    return new AddressEmailAddressRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    AddressEmailAddress<
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
  AddressEmailAddress<
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
    const fieldBuilder = new FieldBuilder(AddressEmailAddress, this.deSerializers);
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
 * Static representation of the [[isDefaultEmailAddress]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_DEFAULT_EMAIL_ADDRESS: fieldBuilder.buildEdmTypeField('IsDefaultEmailAddress', 'Edm.Boolean', true),
/**
 * Static representation of the [[emailAddress]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
EMAIL_ADDRESS: fieldBuilder.buildEdmTypeField('EmailAddress', 'Edm.String', true),
/**
 * Static representation of the [[searchEmailAddress]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SEARCH_EMAIL_ADDRESS: fieldBuilder.buildEdmTypeField('SearchEmailAddress', 'Edm.String', true),
/**
 * Static representation of the [[addressCommunicationRemarkText]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ADDRESS_COMMUNICATION_REMARK_TEXT: fieldBuilder.buildEdmTypeField('AddressCommunicationRemarkText', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', AddressEmailAddress)
  };
  }
}
