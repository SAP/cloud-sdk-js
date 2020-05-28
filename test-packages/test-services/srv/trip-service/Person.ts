import {
  AllFields,
  BigNumberField,
  CustomField,
  Entity,
  EntityBuilderType, Field,
  OneToManyLink, OneToOneLink,
  StringField
} from '@sap-cloud-sdk/core/src/odata/v4';
import BigNumber from 'bignumber.js';
import { PersonRequestBuilder } from './PersonRequestBuilder';
import { LocationType, LocationTypeField } from './LocationType';
import { CollectionField } from '@sap-cloud-sdk/core/src/odata/v4/selectable/collection-field';

export class Person extends Entity implements PersonType{
  static _entityName = 'People';
  static _serviceName = 'Microsoft.OData.Service.Sample.TrippinInMemory.Models';
  static _defaultServicePath = '/TripPinRESTierService';

  userName: string;
  emails: string[];
  age?: BigNumber;
  addressInfo: LocationType[];
  homeAddress?: LocationType;
  bestFriend?: PersonType;
  friend: PersonType[];

  static requestBuilder(): PersonRequestBuilder {
    return new PersonRequestBuilder();
  }

  static builder(): EntityBuilderType<Person, PersonTypeForceMandatory> {
    return Entity.entityBuilder(Person);
  }

  static customField(fieldName: string): CustomField<Person> {
    return Entity.customFieldSelector(fieldName, Person);
  }

}

export interface PersonType{
  userName: string;
  emails: string[];
  age?: BigNumber;
  addressInfo: LocationType[];
  homeAddress?: LocationType;
  friend: PersonType[];
  bestFriend?: PersonType;
}

export interface PersonTypeForceMandatory {
  userName: string;
  emails: string[];
  age: BigNumber;
  addressInfo: LocationType[];
  homeAddress: LocationType;
  friend: PersonType[];
  bestFriend: PersonType;
}

export namespace Person {
  export const USER_NAME: StringField<Person> = new StringField('UserName', Person, 'Edm.String');
  export const EMAILS: CollectionField<Person> = new CollectionField('Emails', Person, new StringField('', Person, 'Edm.String'));
  export const AGE: BigNumberField<Person> = new BigNumberField('Age', Person, 'Edm.Int64');

  export const ADDRESS_INFO: CollectionField<Person> = new CollectionField('AddressInfo', Person, new LocationTypeField('', Person));
  export const HOME_ADDRESS: LocationTypeField<Person> = new LocationTypeField('HomeAddress', Person);

  export const FRIEND: OneToManyLink<Person, Person> = new OneToManyLink('Friends', Person, Person);
  export const BEST_FRIEND: OneToOneLink<Person, Person> = new OneToOneLink('BestFriend', Person, Person);

  export const _keyFields: Array<Field<Person>> = [Person.USER_NAME];

  export const _allFields: Array<StringField<Person> | BigNumberField<Person>  | LocationTypeField<Person> | CollectionField<Person> | OneToManyLink<Person, Person> | OneToOneLink<Person, Person>> = [
    Person.USER_NAME,
    Person.AGE,
    Person.EMAILS,
    Person.ADDRESS_INFO,
    Person.HOME_ADDRESS,
    Person.FRIEND,
    Person.BEST_FRIEND
  ];

  export const ALL_FIELDS: AllFields<Person> = new AllFields('*', Person);

  export const _keys: { [keys: string]: Field<Person> } = Person._keyFields.reduce((acc: { [keys: string]: Field<Person> }, field: Field<Person>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
