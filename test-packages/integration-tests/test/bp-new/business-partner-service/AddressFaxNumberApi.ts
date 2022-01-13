/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { AddressFaxNumberRequestBuilder } from './AddressFaxNumberRequestBuilder';
import { AddressFaxNumber } from './AddressFaxNumber';
export class AddressFaxNumberApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      AddressFaxNumber<
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

  entityConstructor = AddressFaxNumber;

  requestBuilder(): AddressFaxNumberRequestBuilder<
    DeSerializersT
  > {
    return new AddressFaxNumberRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    AddressFaxNumber<
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
  AddressFaxNumber<
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
    const fieldBuilder = new FieldBuilder(AddressFaxNumber, this.deSerializers);
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
 * Static representation of the [[isDefaultFaxNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_DEFAULT_FAX_NUMBER: fieldBuilder.buildEdmTypeField('IsDefaultFaxNumber', 'Edm.Boolean', true),
/**
 * Static representation of the [[faxCountry]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
FAX_COUNTRY: fieldBuilder.buildEdmTypeField('FaxCountry', 'Edm.String', true),
/**
 * Static representation of the [[faxNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
FAX_NUMBER: fieldBuilder.buildEdmTypeField('FaxNumber', 'Edm.String', true),
/**
 * Static representation of the [[faxNumberExtension]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
FAX_NUMBER_EXTENSION: fieldBuilder.buildEdmTypeField('FaxNumberExtension', 'Edm.String', true),
/**
 * Static representation of the [[internationalFaxNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INTERNATIONAL_FAX_NUMBER: fieldBuilder.buildEdmTypeField('InternationalFaxNumber', 'Edm.String', true),
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
ALL_FIELDS: new AllFields('*', AddressFaxNumber)
  };
  }
}
