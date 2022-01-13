/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerRoleRequestBuilder } from './BusinessPartnerRoleRequestBuilder';
import { BusinessPartnerRole } from './BusinessPartnerRole';
export class BusinessPartnerRoleApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      BusinessPartnerRole<
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

  entityConstructor = BusinessPartnerRole;

  requestBuilder(): BusinessPartnerRoleRequestBuilder<
    DeSerializersT
  > {
    return new BusinessPartnerRoleRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    BusinessPartnerRole<
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
  BusinessPartnerRole<
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
    const fieldBuilder = new FieldBuilder(BusinessPartnerRole, this.deSerializers);
    return {
    /**
 * Static representation of the [[businessPartner]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
/**
 * Static representation of the [[businessPartnerRole]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BUSINESS_PARTNER_ROLE: fieldBuilder.buildEdmTypeField('BusinessPartnerRole', 'Edm.String', false),
/**
 * Static representation of the [[validFrom]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALID_FROM: fieldBuilder.buildEdmTypeField('ValidFrom', 'Edm.DateTimeOffset', true),
/**
 * Static representation of the [[validTo]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALID_TO: fieldBuilder.buildEdmTypeField('ValidTo', 'Edm.DateTimeOffset', true),
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
ALL_FIELDS: new AllFields('*', BusinessPartnerRole)
  };
  }
}
