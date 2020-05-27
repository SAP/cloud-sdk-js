/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { TestEntity } from '../test-util/test-services/v2/test-service';

describe('Entity Class', () => {
  let entity: TestEntity;
  const otherStringProperty = 'other';
  const otherDoubleProperty = 0;

  beforeEach(() => {
    entity = TestEntity.builder()
      .stringProperty('1')
      .doubleProperty(234.3)
      .build();
  });

  it('getUpdatedProperties() gets only updated properties and their new values', () => {
    entity.setOrInitializeRemoteState();
    entity.stringProperty = otherStringProperty;
    entity.doubleProperty = otherDoubleProperty;

    const expected = {
      stringProperty: otherStringProperty,
      doubleProperty: otherDoubleProperty
    };

    expect(entity.getUpdatedProperties()).toEqual(expected);
  });

  it('setOrInitializeRemoteState() sets specific state', () => {
    entity.stringProperty = otherStringProperty;
    entity.doubleProperty = otherDoubleProperty;
    entity.setOrInitializeRemoteState({ StringProperty: otherStringProperty });

    const expected = { doubleProperty: otherDoubleProperty };
    expect(entity.getUpdatedProperties()).toEqual(expected);
  });

  it('getCustomFields() should return empty object when there are no custom fields', () => {
    expect(entity.getCustomFields()).toEqual({});
  });

  describe('with custom fields', () => {
    const customFields = { CustomField1: 'abcd', CustomField2: 1234 };

    beforeEach(() => {
      entity.initializeCustomFields(customFields);
    });

    it('hasCustomField() should return false for non existing customFields', () => {
      expect(entity.hasCustomField('UndefinedCustomField')).toBe(false);
    });

    it('hasCustomField() should return true for a defined custom field', () => {
      expect(entity.hasCustomField('CustomField1')).toBe(true);
    });

    it('getCustomFields() should return the custom fields', () => {
      expect(entity.getCustomFields()).toEqual(customFields);
    });

    it('getCustomField() returns the value of the custom field', () => {
      expect(entity.getCustomField('CustomField1')).toBe(
        customFields.CustomField1
      );
    });

    it('setCustomField() adds a new custom field in entity', () => {
      entity.setCustomField('CustomField3', null);

      const expectedCustomFields = { ...customFields, CustomField3: null };
      expect(entity.getCustomFields()).toEqual(expectedCustomFields);
    });

    it('setCustomField() updates custom field when it exists', () => {
      const update = 'UPDATE!';
      entity.setCustomField('CustomField1', update);

      const expectedCustomFields = { ...customFields, CustomField1: update };
      expect(entity.getCustomFields()).toEqual(expectedCustomFields);
    });

    it('setCustomField() throws an error when the provided field name exists as a property in entity ', () => {
      expect(() =>
        entity.setCustomField('StringProperty', 'ERROR!')
      ).toThrowError(
        'The field name "StringProperty" is already defined in the entity and cannot be set as custom field.'
      );
    });

    it('getUpdatedCustomFields() should return only updated custom fields', () => {
      entity.setOrInitializeRemoteState();
      const newCustomFieldValue = 543;
      entity.setCustomField('CustomField2', newCustomFieldValue);

      const expected = { CustomField2: newCustomFieldValue };
      expect(entity.getUpdatedCustomFields()).toEqual(expected);
    });

    it('custom fields should be updated in the remoteState custom fields', () => {
      entity.setOrInitializeRemoteState();
      expect(entity.getUpdatedCustomFields()).toEqual({});
    });

    it('custom fields are included on JSON stringify', () => {
      const expected = {
        stringProperty: entity.stringProperty,
        doubleProperty: entity.doubleProperty,
        ...customFields
      };

      expect(JSON.stringify(entity)).toBe(JSON.stringify(expected));
      expect(JSON.parse(JSON.stringify(entity))).toEqual(expected);
    });
  });
});
