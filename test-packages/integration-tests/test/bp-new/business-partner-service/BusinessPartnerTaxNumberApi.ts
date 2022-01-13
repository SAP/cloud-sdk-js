/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerTaxNumberRequestBuilder } from './BusinessPartnerTaxNumberRequestBuilder';
import { BusinessPartnerTaxNumber } from './BusinessPartnerTaxNumber';
export class BusinessPartnerTaxNumberApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      BusinessPartnerTaxNumber<
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

  entityConstructor = BusinessPartnerTaxNumber;

  requestBuilder(): BusinessPartnerTaxNumberRequestBuilder<
    DeSerializersT
  > {
    return new BusinessPartnerTaxNumberRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    BusinessPartnerTaxNumber<
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
  BusinessPartnerTaxNumber<
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
    const fieldBuilder = new FieldBuilder(BusinessPartnerTaxNumber, this.deSerializers);
    return {
    /**
 * Static representation of the [[businessPartner]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
/**
 * Static representation of the [[bpTaxType]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BP_TAX_TYPE: fieldBuilder.buildEdmTypeField('BPTaxType', 'Edm.String', false),
/**
 * Static representation of the [[bpTaxNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BP_TAX_NUMBER: fieldBuilder.buildEdmTypeField('BPTaxNumber', 'Edm.String', true),
/**
 * Static representation of the [[bpTaxLongNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BP_TAX_LONG_NUMBER: fieldBuilder.buildEdmTypeField('BPTaxLongNumber', 'Edm.String', true),
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
ALL_FIELDS: new AllFields('*', BusinessPartnerTaxNumber)
  };
  }
}
