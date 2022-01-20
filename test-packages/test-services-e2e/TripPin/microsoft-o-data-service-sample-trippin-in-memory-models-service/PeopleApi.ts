/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { People } from './People';
import { PeopleRequestBuilder } from './PeopleRequestBuilder';
import { Photos } from './Photos';
import { PhotosApi } from './PhotosApi';
import { Location } from './Location';
import { PersonGender } from './PersonGender';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  mergeDefaultDeSerializersWith,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  Time,
  EdmTypeField,
  CollectionField,
  EnumField,
  OrderableEdmTypeField,
  OneToManyLink,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class PeopleApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<People<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-many navigation property [[friends]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FRIENDS: OneToManyLink<
      People<DeSerializersT>,
      DeSerializersT,
      People<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property [[photo]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PHOTO: OneToOneLink<
      People<DeSerializersT>,
      DeSerializersT,
      Photos<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [PeopleApi<DeSerializersT>, PhotosApi<DeSerializersT>]
  ): this {
    this.navigationPropertyFields = {
      FRIENDS: new OneToManyLink('Friends', this, linkedApis[0]),
      PHOTO: new OneToOneLink('Photo', this, linkedApis[1])
    };
    return this;
  }

  entityConstructor = People;

  requestBuilder(): PeopleRequestBuilder<DeSerializersT> {
    return new PeopleRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<People<DeSerializersT>, DeSerializersT> {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<People<DeSerializersT>, DeSerializersT, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(People, this.deSerializers);
    return {
      /**
       * Static representation of the [[userName]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      USER_NAME: fieldBuilder.buildEdmTypeField(
        'UserName',
        'Edm.String',
        false
      ),
      /**
       * Static representation of the [[firstName]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      FIRST_NAME: fieldBuilder.buildEdmTypeField(
        'FirstName',
        'Edm.String',
        false
      ),
      /**
       * Static representation of the [[lastName]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      LAST_NAME: fieldBuilder.buildEdmTypeField(
        'LastName',
        'Edm.String',
        false
      ),
      /**
       * Static representation of the [[emails]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      EMAILS: fieldBuilder.buildCollectionField('Emails', 'Edm.String', true),
      /**
       * Static representation of the [[addressInfo]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      ADDRESS_INFO: fieldBuilder.buildCollectionField(
        'AddressInfo',
        Location,
        true
      ),
      /**
       * Static representation of the [[gender]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      GENDER: fieldBuilder.buildEnumField('Gender', PersonGender, true),
      /**
       * Static representation of the [[concurrency]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      CONCURRENCY: fieldBuilder.buildEdmTypeField(
        'Concurrency',
        'Edm.Int64',
        false
      ),
      ...this.navigationPropertyFields,
      /**
       *
       * All fields selector.
       */
      ALL_FIELDS: new AllFields('*', People)
    };
  }
}
