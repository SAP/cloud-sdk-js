import {
  BigNumberFieldODataV4,
  CollectionFieldODataV4, CustomField, CustomFieldODataV4,
  Entity, EntityBuilderType, EntityBuilderTypeODataV4, EntityODataV4, Link, LinkODataV4,
  OneToOneLink, OneToOneLinkODataV4, Selectable, SelectableODataV4,
  StringField, StringFieldODataV4
} from '../../../../src';
import BigNumber from 'bignumber.js';
import { PersonRequestBuilder } from './PersonRequestBuilder';
import { LocationType, LocationTypeField } from './LocationType';

export class Person extends EntityODataV4 implements PersonType{
  static _entityName = 'Person';
  static _serviceName = 'Microsoft.OData.Service.Sample.TrippinInMemory.Models';
  //TODO
  static _defaultServicePath = '/missing';

  userName!: string;
  emails!: string[];
  age?: BigNumber;
  addressInfo!: LocationType[];
  homeAddress?: LocationType;
  bestFriend!: PersonType;
  friend!: PersonType[];

  static requestBuilder(): PersonRequestBuilder {
    return new PersonRequestBuilder();
  }

  static builder(): EntityBuilderTypeODataV4<Person, PersonTypeForceMandatory> {
    return EntityODataV4.entityBuilder(Person);
  }

  static customField(fieldName: string): CustomFieldODataV4<Person> {
    return EntityODataV4.customFieldSelector(fieldName, Person);
  }

}

export interface PersonType{
  userName: string;
  emails: string[];
  age?: BigNumber;
  addressInfo: LocationType[];
  homeAddress?: LocationType;
  friend: PersonType[];
  bestFriend: PersonType;
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
  export const USER_NAME: StringFieldODataV4<Person> = new StringFieldODataV4('UserName', Person, 'Edm.String');
  // todo instead of string field, just edm type? or create CollectionStringField like ComplexTypeStringField for less relevant properties?
  export const EMAILS: CollectionFieldODataV4<Person> = new CollectionFieldODataV4('Emails', Person, new StringFieldODataV4('', Person, 'Edm.String'));
  export const AGE: BigNumberFieldODataV4<Person> = new BigNumberFieldODataV4('Age', Person, 'Edm.Int64');

  export const ADDRESS_INFO: CollectionFieldODataV4<Person> = new CollectionFieldODataV4('AddressInfo', Person, new LocationTypeField('', Person));
  export const HOME_ADDRESS: LocationTypeField<Person> = new LocationTypeField('HomeAddress', Person);

  export const FRIEND: LinkODataV4<Person, Person> = new LinkODataV4('Friends', Person, Person);
  export const BEST_FRIEND: OneToOneLinkODataV4<Person, Person> = new OneToOneLinkODataV4('BestFriend', Person, Person);

  export const _keyFields: Array<SelectableODataV4<Person>> = [Person.USER_NAME];

  export const _allFields: Array<StringFieldODataV4<Person> | BigNumberFieldODataV4<Person> | CollectionFieldODataV4<Person> | LocationTypeField<Person> | LinkODataV4<Person, Person> | OneToOneLinkODataV4<Person, Person>> = [
    Person.USER_NAME,
    Person.AGE,
    Person.EMAILS,
    Person.ADDRESS_INFO,
    Person.HOME_ADDRESS,
    Person.FRIEND,
    Person.BEST_FRIEND
  ];

  export const _keys: { [keys: string]: SelectableODataV4<Person> } = Person._keyFields.reduce((acc: { [keys: string]: SelectableODataV4<Person> }, field: SelectableODataV4<Person>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
