/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { BuPaAddressUsageRequestBuilder } from './BuPaAddressUsageRequestBuilder';
import { BuPaAddressUsage } from './BuPaAddressUsage';
export class BuPaAddressUsageApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      BuPaAddressUsage<
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

  entityConstructor = BuPaAddressUsage;

  requestBuilder(): BuPaAddressUsageRequestBuilder<
    DeSerializersT
  > {
    return new BuPaAddressUsageRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    BuPaAddressUsage<
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
  BuPaAddressUsage<
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
    const fieldBuilder = new FieldBuilder(BuPaAddressUsage, this.deSerializers);
    return {
    /**
 * Static representation of the [[businessPartner]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
/**
 * Static representation of the [[validityEndDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALIDITY_END_DATE: fieldBuilder.buildEdmTypeField('ValidityEndDate', 'Edm.DateTimeOffset', false),
/**
 * Static representation of the [[addressUsage]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ADDRESS_USAGE: fieldBuilder.buildEdmTypeField('AddressUsage', 'Edm.String', false),
/**
 * Static representation of the [[addressId]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ADDRESS_ID: fieldBuilder.buildEdmTypeField('AddressID', 'Edm.String', false),
/**
 * Static representation of the [[validityStartDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('ValidityStartDate', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[standardUsage]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
STANDARD_USAGE: fieldBuilder.buildEdmTypeField('StandardUsage', 'Edm.Boolean', true),
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
ALL_FIELDS: new AllFields('*', BuPaAddressUsage)
  };
  }
}
