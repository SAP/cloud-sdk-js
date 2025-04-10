/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
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
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  CollectionField,
  EnumField,
  OneToManyLink,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export declare class PeopleApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<People<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): PeopleApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [PeopleApi<DeSerializersT>, PhotosApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof People;
  requestBuilder(): PeopleRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<People<DeSerializersT>, DeSerializersT>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<People<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof People, DeSerializersT>;
  private _schema?;
  get schema(): {
    USER_NAME: OrderableEdmTypeField<
      People<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FIRST_NAME: OrderableEdmTypeField<
      People<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    LAST_NAME: OrderableEdmTypeField<
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
     * Static representation of the one-to-many navigation property {@link friends} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FRIENDS: OneToManyLink<
      People<DeSerializersT>,
      DeSerializersT,
      PeopleApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link photo} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PHOTO: OneToOneLink<
      People<DeSerializersT>,
      DeSerializersT,
      PhotosApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<People<DeSerializers>>;
  };
}
