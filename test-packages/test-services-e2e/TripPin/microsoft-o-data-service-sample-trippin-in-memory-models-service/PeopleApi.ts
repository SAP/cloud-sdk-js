/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { People } from './People';
import { PeopleRequestBuilder } from './PeopleRequestBuilder';
import { PhotosApi } from './PhotosApi';
import { Location } from './Location';
import { PersonGender } from './PersonGender';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  EdmTypeField,
  CollectionField,
  EnumField,
  OrderableEdmTypeField,
  OneToManyLink,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
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
      PeopleApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property [[photo]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PHOTO: OneToOneLink<
      People<DeSerializersT>,
      DeSerializersT,
      PhotosApi<DeSerializersT>
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

  private _fieldBuilder?: FieldBuilder<typeof People, DeSerializersT>;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(People, this.deSerializers);
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    USER_NAME: EdmTypeField<
      People<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FIRST_NAME: EdmTypeField<
      People<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    LAST_NAME: EdmTypeField<
      People<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    EMAILS: CollectionField<
      People<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ADDRESS_INFO: CollectionField<
      People<DeSerializers>,
      DeSerializersT,
      Location,
      true,
      true
    >;
    GENDER: EnumField<
      People<DeSerializers>,
      DeSerializersT,
      PersonGender,
      true,
      true
    >;
    CONCURRENCY: OrderableEdmTypeField<
      People<DeSerializers>,
      DeSerializersT,
      'Edm.Int64',
      false,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property [[friends]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FRIENDS: OneToManyLink<
      People<DeSerializersT>,
      DeSerializersT,
      PeopleApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property [[photo]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PHOTO: OneToOneLink<
      People<DeSerializersT>,
      DeSerializersT,
      PhotosApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<People<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
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

    return this._schema;
  }
}
