/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { AddressPhoneNumberRequestBuilder } from './AddressPhoneNumberRequestBuilder';
import { AddressPhoneNumber } from './AddressPhoneNumber';
export class AddressPhoneNumberApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      AddressPhoneNumber<
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

  entityConstructor = AddressPhoneNumber;

  requestBuilder(): AddressPhoneNumberRequestBuilder<
    DeSerializersT
  > {
    return new AddressPhoneNumberRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    AddressPhoneNumber<
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
  AddressPhoneNumber<
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
    const fieldBuilder = new FieldBuilder(AddressPhoneNumber, this.deSerializers);
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
 * Static representation of the [[destinationLocationCountry]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DESTINATION_LOCATION_COUNTRY: fieldBuilder.buildEdmTypeField('DestinationLocationCountry', 'Edm.String', true),
/**
 * Static representation of the [[isDefaultPhoneNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_DEFAULT_PHONE_NUMBER: fieldBuilder.buildEdmTypeField('IsDefaultPhoneNumber', 'Edm.Boolean', true),
/**
 * Static representation of the [[phoneNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PHONE_NUMBER: fieldBuilder.buildEdmTypeField('PhoneNumber', 'Edm.String', true),
/**
 * Static representation of the [[phoneNumberExtension]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PHONE_NUMBER_EXTENSION: fieldBuilder.buildEdmTypeField('PhoneNumberExtension', 'Edm.String', true),
/**
 * Static representation of the [[internationalPhoneNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INTERNATIONAL_PHONE_NUMBER: fieldBuilder.buildEdmTypeField('InternationalPhoneNumber', 'Edm.String', true),
/**
 * Static representation of the [[phoneNumberType]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PHONE_NUMBER_TYPE: fieldBuilder.buildEdmTypeField('PhoneNumberType', 'Edm.String', true),
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
ALL_FIELDS: new AllFields('*', AddressPhoneNumber)
  };
  }
}
