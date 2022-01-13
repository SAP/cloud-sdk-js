/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { BuPaIndustryRequestBuilder } from './BuPaIndustryRequestBuilder';
import { BuPaIndustry } from './BuPaIndustry';
export class BuPaIndustryApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      BuPaIndustry<
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

  entityConstructor = BuPaIndustry;

  requestBuilder(): BuPaIndustryRequestBuilder<
    DeSerializersT
  > {
    return new BuPaIndustryRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    BuPaIndustry<
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
  BuPaIndustry<
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
    const fieldBuilder = new FieldBuilder(BuPaIndustry, this.deSerializers);
    return {
    /**
 * Static representation of the [[industrySector]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INDUSTRY_SECTOR: fieldBuilder.buildEdmTypeField('IndustrySector', 'Edm.String', false),
/**
 * Static representation of the [[industrySystemType]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INDUSTRY_SYSTEM_TYPE: fieldBuilder.buildEdmTypeField('IndustrySystemType', 'Edm.String', false),
/**
 * Static representation of the [[businessPartner]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
/**
 * Static representation of the [[isStandardIndustry]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_STANDARD_INDUSTRY: fieldBuilder.buildEdmTypeField('IsStandardIndustry', 'Edm.String', true),
/**
 * Static representation of the [[industryKeyDescription]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INDUSTRY_KEY_DESCRIPTION: fieldBuilder.buildEdmTypeField('IndustryKeyDescription', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', BuPaIndustry)
  };
  }
}
