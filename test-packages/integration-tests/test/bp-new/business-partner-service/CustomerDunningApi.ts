/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerDunningRequestBuilder } from './CustomerDunningRequestBuilder';
import { CustomerDunning } from './CustomerDunning';
export class CustomerDunningApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      CustomerDunning<
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

  entityConstructor = CustomerDunning;

  requestBuilder(): CustomerDunningRequestBuilder<
    DeSerializersT
  > {
    return new CustomerDunningRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    CustomerDunning<
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
  CustomerDunning<
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
    const fieldBuilder = new FieldBuilder(CustomerDunning, this.deSerializers);
    return {
    /**
 * Static representation of the [[customer]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', false),
/**
 * Static representation of the [[companyCode]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', false),
/**
 * Static representation of the [[dunningArea]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DUNNING_AREA: fieldBuilder.buildEdmTypeField('DunningArea', 'Edm.String', false),
/**
 * Static representation of the [[dunningBlock]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DUNNING_BLOCK: fieldBuilder.buildEdmTypeField('DunningBlock', 'Edm.String', true),
/**
 * Static representation of the [[dunningLevel]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DUNNING_LEVEL: fieldBuilder.buildEdmTypeField('DunningLevel', 'Edm.String', true),
/**
 * Static representation of the [[dunningProcedure]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DUNNING_PROCEDURE: fieldBuilder.buildEdmTypeField('DunningProcedure', 'Edm.String', true),
/**
 * Static representation of the [[dunningRecipient]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DUNNING_RECIPIENT: fieldBuilder.buildEdmTypeField('DunningRecipient', 'Edm.String', true),
/**
 * Static representation of the [[lastDunnedOn]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LAST_DUNNED_ON: fieldBuilder.buildEdmTypeField('LastDunnedOn', 'Edm.DateTime', true),
/**
 * Static representation of the [[legDunningProcedureOn]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LEG_DUNNING_PROCEDURE_ON: fieldBuilder.buildEdmTypeField('LegDunningProcedureOn', 'Edm.DateTime', true),
/**
 * Static representation of the [[dunningClerk]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DUNNING_CLERK: fieldBuilder.buildEdmTypeField('DunningClerk', 'Edm.String', true),
/**
 * Static representation of the [[authorizationGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
/**
 * Static representation of the [[customerAccountGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER_ACCOUNT_GROUP: fieldBuilder.buildEdmTypeField('CustomerAccountGroup', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', CustomerDunning)
  };
  }
}
