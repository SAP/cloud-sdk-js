/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  deserializeEntity,
  deserializeEntityODataV4,
  extractCustomFields
} from '../src/entity-deserializer';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntitySingleLink
} from './test-util/test-services/test-service';
import { Person } from './test-util/test-services/test-service-odata-v4/Person';

describe('entity-deserializer', () => {
  it('should deserialize an entity with collection of string properties', () => {
    const emails = ['abc@example.com', 'efg@example.com'];
    const person = new Person();
    person.emails = emails;

    const response = { Emails: emails };

    expect(deserializeEntityODataV4(response, Person)).toEqual(person);
  });

  it('should deserialize an entity with collection of complex properties', () => {
    const homeAddress = 'home address';
    const homeAddress2 = 'home address 2';
    const userName = 'user';

    const expected = new Person();
    expected.homeAddress = {
      address: homeAddress
    };
    expected.addressInfo = [
      { address: homeAddress },
      { address: homeAddress2 }
    ];
    expected.userName = userName;

    const actual = deserializeEntityODataV4(
      {
        HomeAddress: {
          Address: homeAddress
        },
        AddressInfo: [
          {
            Address: homeAddress
          },
          {
            Address: homeAddress2
          }
        ],
        UserName: userName
      },
      Person
    );

    expect(actual).toEqual(expected);
  });

  it('should build an entity with properties', () => {
    const prop = 'test';
    const testEntity = new TestEntity();
    testEntity.stringProperty = prop;

    const response = { StringProperty: prop };

    expect(deserializeEntity(response, TestEntity)).toEqual(testEntity);
  });

  it('should build an entity with multi link', () => {
    const prop = 'test';
    const multiLinkEntity = new TestEntityMultiLink();
    multiLinkEntity.stringProperty = prop;
    const testEntity = new TestEntity();
    testEntity.toMultiLink = [multiLinkEntity];

    const response = {
      to_MultiLink: {
        results: [{ StringProperty: prop }]
      }
    };
    expect(deserializeEntity(response, TestEntity)).toEqual(testEntity);
  });

  it('should build an entity with one to one link', () => {
    const prop = 'test';

    const singleLinkEntity = new TestEntitySingleLink();
    singleLinkEntity.stringProperty = prop;

    const testEntity = new TestEntity();
    testEntity.toSingleLink = singleLinkEntity;

    const response = {
      to_SingleLink: {
        StringProperty: prop
      }
    };

    expect(deserializeEntity(response, TestEntity)).toEqual(testEntity);
  });

  it('should build an entity with custom fields', () => {
    const withCustomFields = {
      KeyPropertyGuid: '123456789',
      to_SingleLink: { StringProperty: 'testSingle' },
      to_MultiLink: [{ StringProperty: 'testMulti' }],
      FirstCustomField: 'ACustomField',
      SecondCustomField: 12345
    };

    const expected = {
      FirstCustomField: 'ACustomField',
      SecondCustomField: 12345
    };

    expect(extractCustomFields(withCustomFields, TestEntity)).toEqual(expected);
  });

  describe('entity with complex type field', () => {
    const stringProperty = 'prop';
    const int16Property = 16;
    const booleanProperty = false;

    const expected = new TestEntity();
    expected.complexTypeProperty = {
      stringProperty,
      int16Property,
      booleanProperty
    };
    expected.stringProperty = 'test';

    it('should deserialize', () => {
      const actual = deserializeEntity(
        {
          ComplexTypeProperty: {
            StringProperty: stringProperty,
            Int16Property: int16Property,
            BooleanProperty: booleanProperty
          },
          StringProperty: expected.stringProperty
        },
        TestEntity
      );

      expect(actual).toEqual(expected);
    });

    it('should deserialize with unknown keys', () => {
      const actual = deserializeEntity(
        {
          ComplexTypeProperty: {
            StringProperty: stringProperty,
            Int16Property: int16Property,
            BooleanProperty: booleanProperty,
            UnknownKey: ''
          },
          StringProperty: expected.stringProperty
        },
        TestEntity
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('odata v4 tests', () => {
    it('should deserialize an entity with collection of string properties', () => {
      const emails = ['abc@example.com', 'efg@example.com'];
      const person = new Person();
      person.emails = emails;

      const response = { Emails: emails };

      expect(deserializeEntityODataV4(response, Person)).toEqual(person);
    });

    it('should deserialize an entity with collection of complex properties', () => {
      const homeAddress = 'home address';
      const homeAddress2 = 'home address 2';
      const userName = 'user';

      const expected = new Person();
      expected.homeAddress = {
        address: homeAddress
      };
      expected.addressInfo = [
        { address: homeAddress },
        { address: homeAddress2 }
      ];
      expected.userName = userName;

      const actual = deserializeEntityODataV4(
        {
          HomeAddress: {
            Address: homeAddress
          },
          AddressInfo: [
            {
              Address: homeAddress
            },
            {
              Address: homeAddress2
            }
          ],
          UserName: userName
        },
        Person
      );

      expect(actual).toEqual(expected);
    });
  });
});
