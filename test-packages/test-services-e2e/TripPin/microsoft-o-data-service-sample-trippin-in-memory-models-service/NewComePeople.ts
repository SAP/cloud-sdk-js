/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { NewComePeopleRequestBuilder } from './NewComePeopleRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { Location, LocationField } from './Location';
import { PersonGender } from './PersonGender';
import { Feature } from './Feature';
import { AllFields, BigNumberField, CollectionField, CustomFieldV4, EntityBuilderType, EntityV4, EnumField, Field, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "NewComePeople" of service "Microsoft.OData.Service.Sample.TrippinInMemory.Models".
 */
export class NewComePeople extends EntityV4 implements NewComePeopleType {
  /**
   * Technical entity name for NewComePeople.
   */
  static _entityName = 'NewComePeople';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for NewComePeople.
   */
  static _serviceName = 'Microsoft.OData.Service.Sample.TrippinInMemory.Models';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = 'TripPinRESTierService/(S(duh2c3dgb1c5lzc0bqwgyekc))/';
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
   * @nullable
   */
  lastName?: string;
  /**
   * Middle Name.
   * @nullable
   */
  middleName?: string;
  /**
   * Gender.
   */
  gender!: PersonGender;
  /**
   * Age.
   * @nullable
   */
  age?: BigNumber;
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
   * Home Address.
   * @nullable
   */
  homeAddress?: Location;
  /**
   * Favorite Feature.
   */
  favoriteFeature!: Feature;
  /**
   * Features.
   */
  features!: Feature[];

  /**
   * Returns an entity builder to construct instances `NewComePeople`.
   * @returns A builder that constructs instances of entity type `NewComePeople`.
   */
  static builder(): EntityBuilderType<NewComePeople, NewComePeopleTypeForceMandatory> {
    return EntityV4.entityBuilder(NewComePeople);
  }

  /**
   * Returns a request builder to construct requests for operations on the `NewComePeople` entity type.
   * @returns A `NewComePeople` request builder.
   */
  static requestBuilder(): NewComePeopleRequestBuilder {
    return new NewComePeopleRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `NewComePeople`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `NewComePeople`.
   */
  static customField(fieldName: string): CustomFieldV4<NewComePeople> {
    return EntityV4.customFieldSelector(fieldName, NewComePeople);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface NewComePeopleType {
  userName: string;
  firstName: string;
  lastName?: string;
  middleName?: string;
  gender: PersonGender;
  age?: BigNumber;
  emails?: string[];
  addressInfo?: Location[];
  homeAddress?: Location;
  favoriteFeature: Feature;
  features: Feature[];
}

export interface NewComePeopleTypeForceMandatory {
  userName: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: PersonGender;
  age: BigNumber;
  emails: string[];
  addressInfo: Location[];
  homeAddress: Location;
  favoriteFeature: Feature;
  features: Feature[];
}

export namespace NewComePeople {
  /**
   * Static representation of the [[userName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const USER_NAME: StringField<NewComePeople> = new StringField('UserName', NewComePeople, 'Edm.String');
  /**
   * Static representation of the [[firstName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FIRST_NAME: StringField<NewComePeople> = new StringField('FirstName', NewComePeople, 'Edm.String');
  /**
   * Static representation of the [[lastName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LAST_NAME: StringField<NewComePeople> = new StringField('LastName', NewComePeople, 'Edm.String');
  /**
   * Static representation of the [[middleName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MIDDLE_NAME: StringField<NewComePeople> = new StringField('MiddleName', NewComePeople, 'Edm.String');
  /**
   * Static representation of the [[gender]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GENDER: EnumField<NewComePeople> = new EnumField('Gender', NewComePeople);
  /**
   * Static representation of the [[age]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const AGE: BigNumberField<NewComePeople> = new BigNumberField('Age', NewComePeople, 'Edm.Int64');
  /**
   * Static representation of the [[emails]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const EMAILS: CollectionField<NewComePeople, 'Edm.String'> = new CollectionField('Emails', NewComePeople, 'Edm.String');
  /**
   * Static representation of the [[addressInfo]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ADDRESS_INFO: CollectionField<NewComePeople, Location> = new CollectionField('AddressInfo', NewComePeople, Location);
  /**
   * Static representation of the [[homeAddress]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const HOME_ADDRESS: LocationField<NewComePeople> = new LocationField('HomeAddress', NewComePeople);
  /**
   * Static representation of the [[favoriteFeature]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FAVORITE_FEATURE: EnumField<NewComePeople> = new EnumField('FavoriteFeature', NewComePeople);
  /**
   * Static representation of the [[features]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FEATURES: CollectionField<NewComePeople, 'Edm.Enum'> = new CollectionField('Features', NewComePeople, 'Edm.Enum');
  /**
   * All fields of the NewComePeople entity.
   */
  export const _allFields: Array<StringField<NewComePeople> | EnumField<NewComePeople> | BigNumberField<NewComePeople> | CollectionField<NewComePeople, 'Edm.String'> | CollectionField<NewComePeople, Location> | LocationField<NewComePeople> | CollectionField<NewComePeople, 'Edm.Enum'>> = [
    NewComePeople.USER_NAME,
    NewComePeople.FIRST_NAME,
    NewComePeople.LAST_NAME,
    NewComePeople.MIDDLE_NAME,
    NewComePeople.GENDER,
    NewComePeople.AGE,
    NewComePeople.EMAILS,
    NewComePeople.ADDRESS_INFO,
    NewComePeople.HOME_ADDRESS,
    NewComePeople.FAVORITE_FEATURE,
    NewComePeople.FEATURES
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<NewComePeople> = new AllFields('*', NewComePeople);
  /**
   * All key fields of the NewComePeople entity.
   */
  export const _keyFields: Array<Field<NewComePeople>> = [NewComePeople.USER_NAME];
  /**
   * Mapping of all key field names to the respective static field property NewComePeople.
   */
  export const _keys: { [keys: string]: Field<NewComePeople> } = NewComePeople._keyFields.reduce((acc: { [keys: string]: Field<NewComePeople> }, field: Field<NewComePeople>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
