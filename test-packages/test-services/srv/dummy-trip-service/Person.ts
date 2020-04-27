import {
  BigNumberField,
  BooleanField, CollectionField, CustomField,
  DateField,
  Entity, EntityBuilderType, Link,
  NumberField, OneToOneLink, Selectable,
  StringField,
} from '@sap-cloud-sdk/core';
import BigNumber from 'bignumber.js';
import { PersonRequestBuilder } from './PersonRequestBuilder';
import { LocationTypeField } from './LocationType';

export class Person extends Entity implements PersonType{
  static _entityName = 'Person';
  static _serviceName = 'Microsoft.OData.Service.Sample.TrippinInMemory.Models';
  //TODO
  static _defaultServicePath = '/missing';

  emails: string[];
  userName: string;
  age: BigNumber;

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
  age: BigNumber;
}

export interface PersonTypeForceMandatory {
  userName: string;
  emails: string[];
  age: BigNumber;
}

export namespace Person {
  export const USER_NAME: StringField<Person> = new StringField('UserName', Person, 'Edm.String');
  // todo instead of string field, just edm type? or create CollectionStringField like ComplexTypeStringField for less relevant properties?
  export const EMAILS: CollectionField<Person> = new CollectionField('UserName', Person, new StringField('', Person, 'Edm.String'));
  export const AGE: BigNumberField<Person> = new BigNumberField('Int64Property', Person, 'Edm.Int64');

  export const ADDRESS_INFO: CollectionField<Person> = new CollectionField('AddressInfo', Person, new LocationTypeField('', Person));
  export const HOME_ADDRESS: LocationTypeField<Person> = new LocationTypeField('HomeAddress', Person);

  export const FRIEND: Link<Person, Person> = new Link('Friends', Person, Person);
  export const BEST_FRIEND: OneToOneLink<Person, Person> = new OneToOneLink('BestFriend', Person, Person);

  export const _keyFields: Array<Selectable<Person>> = [Person.USER_NAME];

  export const _allFields: Array<StringField<Person> | BigNumberField<Person> | CollectionField<Person> | LocationTypeField<Person> | Link<Person, Person> | OneToOneLink<Person, Person>> = [
    Person.USER_NAME,
    Person.AGE,
    Person.EMAILS,
    Person.ADDRESS_INFO,
    Person.HOME_ADDRESS,
    Person.FRIEND,
    Person.BEST_FRIEND
  ];

  export const _keys: { [keys: string]: Selectable<Person> } = Person._keyFields.reduce((acc: { [keys: string]: Selectable<Person> }, field: Selectable<Person>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
