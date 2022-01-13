/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { BuPaIdentificationRequestBuilder } from './BuPaIdentificationRequestBuilder';
import { BuPaIdentification } from './BuPaIdentification';
export class BuPaIdentificationApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      BuPaIdentification<
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

  entityConstructor = BuPaIdentification;

  requestBuilder(): BuPaIdentificationRequestBuilder<
    DeSerializersT
  > {
    return new BuPaIdentificationRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    BuPaIdentification<
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
  BuPaIdentification<
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
    const fieldBuilder = new FieldBuilder(BuPaIdentification, this.deSerializers);
    return {
    /**
 * Static representation of the [[businessPartner]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
/**
 * Static representation of the [[bpIdentificationType]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BP_IDENTIFICATION_TYPE: fieldBuilder.buildEdmTypeField('BPIdentificationType', 'Edm.String', false),
/**
 * Static representation of the [[bpIdentificationNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BP_IDENTIFICATION_NUMBER: fieldBuilder.buildEdmTypeField('BPIdentificationNumber', 'Edm.String', false),
/**
 * Static representation of the [[bpIdnNmbrIssuingInstitute]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BP_IDN_NMBR_ISSUING_INSTITUTE: fieldBuilder.buildEdmTypeField('BPIdnNmbrIssuingInstitute', 'Edm.String', true),
/**
 * Static representation of the [[bpIdentificationEntryDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BP_IDENTIFICATION_ENTRY_DATE: fieldBuilder.buildEdmTypeField('BPIdentificationEntryDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[country]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
COUNTRY: fieldBuilder.buildEdmTypeField('Country', 'Edm.String', true),
/**
 * Static representation of the [[region]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
REGION: fieldBuilder.buildEdmTypeField('Region', 'Edm.String', true),
/**
 * Static representation of the [[validityStartDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('ValidityStartDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[validityEndDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALIDITY_END_DATE: fieldBuilder.buildEdmTypeField('ValidityEndDate', 'Edm.DateTime', true),
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
ALL_FIELDS: new AllFields('*', BuPaIdentification)
  };
  }
}
