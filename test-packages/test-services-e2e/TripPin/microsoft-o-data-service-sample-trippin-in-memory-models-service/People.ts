/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PeopleRequestBuilder } from './PeopleRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { Location } from './Location';
import { PersonGender } from './PersonGender';
import {
  AllFields,
  CollectionField,
  Constructable,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field,
  FieldBuilder,
  OneToManyLink,
  OneToOneLink,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "People" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export class People extends EntityV4 implements PeopleType {
  /**
   * Technical entity name for People.
   */
  static _entityName = 'People';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath =
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  /**
   * User Name.
   */
  userName!: string;
  /**
   * First Name.
   */
  firstName!: string;
  /**
   * Last Name.
   */
  lastName!: string;
  /**
   * Emails.
   * @nullable
   */
  emails?: string[];
  /**
   * Address Info.
   * @nullable
   */
  addressInfo?: Location[];
  /**
   * Gender.
   * @nullable
   */
  gender?: PersonGender;
  /**
   * Concurrency.
   */
  concurrency!: BigNumber;
  /**
   * One-to-many navigation property to the [[People]] entity.
   */
  friends!: People[];
  /**
   * One-to-one navigation property to the [[Photos]] entity.
   */
  photo?: Photos | null;

  /**
   * Returns an entity builder to construct instances of `People`.
   * @returns A builder that constructs instances of entity type `People`.
   */
  static builder(): EntityBuilderType<People, PeopleType> {
    return EntityV4.entityBuilder(People);
  }

  /**
   * Returns a request builder to construct requests for operations on the `People` entity type.
   * @returns A `People` request builder.
   */
  static requestBuilder(): PeopleRequestBuilder {
    return new PeopleRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `People`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `People`.
   */
  static customField(fieldName: string): CustomFieldV4<People> {
    return EntityV4.customFieldSelector(fieldName, People);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

import { Photos, PhotosType } from './Photos';

export interface PeopleType {
  userName: string;
  firstName: string;
  lastName: string;
  emails?: string[] | null;
  addressInfo?: Location[] | null;
  gender?: PersonGender | null;
  concurrency: BigNumber;
  friends: PeopleType[];
  photo?: PhotosType | null;
}

export namespace People {
  const _fieldBuilder: FieldBuilder<Constructable<People>> = new FieldBuilder(
    People
  );
  /**
   * Static representation of the [[userName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const USER_NAME = _fieldBuilder.buildEdmTypeField(
    'UserName',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[firstName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FIRST_NAME = _fieldBuilder.buildEdmTypeField(
    'FirstName',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[lastName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LAST_NAME = _fieldBuilder.buildEdmTypeField(
    'LastName',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[emails]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const EMAILS = _fieldBuilder.buildCollectionField(
    'Emails',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[addressInfo]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ADDRESS_INFO = _fieldBuilder.buildCollectionField(
    'AddressInfo',
    Location,
    true
  );
  /**
   * Static representation of the [[gender]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GENDER = _fieldBuilder.buildEnumField(
    'Gender',
    PersonGender,
    true
  );
  /**
   * Static representation of the [[concurrency]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CONCURRENCY = _fieldBuilder.buildEdmTypeField(
    'Concurrency',
    'Edm.Int64',
    false
  );
  /**
   * Static representation of the one-to-many navigation property [[friends]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FRIENDS: OneToManyLink<People, People> = new OneToManyLink(
    'Friends',
    People,
    People
  );
  /**
   * Static representation of the one-to-one navigation property [[photo]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const PHOTO: OneToOneLink<People, Photos> = new OneToOneLink(
    'Photo',
    People,
    Photos
  );
  /**
   * All fields of the People entity.
   */
  export const _allFields: Array<
    | EdmTypeField<People, 'Edm.String', false, true>
    | CollectionField<People, 'Edm.String', true, true>
    | CollectionField<People, Location, true, true>
    | EnumField<People, PersonGender, true, true>
    | OrderableEdmTypeField<People, 'Edm.Int64', false, true>
    | OneToManyLink<People, People>
    | OneToOneLink<People, Photos>
  > = [
    People.USER_NAME,
    People.FIRST_NAME,
    People.LAST_NAME,
    People.EMAILS,
    People.ADDRESS_INFO,
    People.GENDER,
    People.CONCURRENCY,
    People.FRIENDS,
    People.PHOTO
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<People> = new AllFields('*', People);
  /**
   * All key fields of the People entity.
   */
  export const _keyFields: Array<Field<People, boolean, boolean>> = [
    People.USER_NAME
  ];
  /**
   * Mapping of all key field names to the respective static field property People.
   */
  export const _keys: { [keys: string]: Field<People, boolean, boolean> } =
    People._keyFields.reduce(
      (
        acc: { [keys: string]: Field<People, boolean, boolean> },
        field: Field<People, boolean, boolean>
      ) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
