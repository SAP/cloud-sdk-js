import {
  TestEntity,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '../../core/test/test-util/test-services/v2/test-service';

describe('entity', () => {
  describe('remote state', () => {
    it('setOrInitializeRemoteState() sets remote state on entity', () => {
      const entity = TestEntity.builder()
        .stringProperty('test')
        .toSingleLink(
          TestEntitySingleLink.builder().stringProperty('singleLink').build()
        )
        .toMultiLink([
          TestEntityMultiLink.builder().stringProperty('multiLink').build()
        ])
        .withCustomFields({ custom: 'custom' })
        .build()
        .setOrInitializeRemoteState();

      expect(entity['remoteState']).toStrictEqual(entity['asObject']());
      expect(entity.getUpdatedPropertyNames()).toStrictEqual([]);
    });

    it('setOrInitializeRemoteState() sets specific state when passed as parameter', () => {
      const entity = TestEntity.builder()
        .stringProperty('test')
        .doubleProperty(1.2)
        .build();
      entity.setOrInitializeRemoteState({ StringProperty: 'test' });

      expect(entity.getUpdatedPropertyNames()).toStrictEqual([
        'doubleProperty'
      ]);
    });

    it('gets state diff when changed, excluding custom fields', () => {
      const entity = TestEntity.builder()
        .stringProperty('test')
        .build()
        .setOrInitializeRemoteState();

      entity.stringProperty = 'new';
      entity.doubleProperty = 0.0;
      entity.setCustomField('custom', 'custom');
      entity.toSingleLink = TestEntitySingleLink.builder()
        .stringProperty('singleLink')
        .build();
      entity.toMultiLink = [
        TestEntityMultiLink.builder().stringProperty('multiLink').build()
      ];

      expect(entity.getUpdatedProperties()).toEqual({
        stringProperty: 'new',
        doubleProperty: 0.0,
        toSingleLink: { stringProperty: 'singleLink' },
        toMultiLink: [{ stringProperty: 'multiLink' }]
      });
    });

    it('getUpdatedCustomFields() should return only updated custom fields', () => {
      const entity = TestEntity.builder()
        .withCustomFields({ custom: 'custom' })
        .build();
      entity.setOrInitializeRemoteState();
      entity.setCustomField('newCustomField', 543);

      expect(entity.getUpdatedCustomFields()).toStrictEqual({
        newCustomField: 543
      });
    });
  });

  it('getCustomFields() should return empty object when there are no custom fields', () => {
    const entity = TestEntity.builder().stringProperty('test').build();
    expect(entity.getCustomFields()).toEqual({});
  });

  describe('custom fields', () => {
    it('getCustomFields() should return empty object when there are no custom fields', () => {
      const entity = TestEntity.builder().stringProperty('test').build();
      expect(entity.getCustomFields()).toEqual({});
    });

    it('hasCustomField() should return false for non existing customFields', () => {
      const entity = TestEntity.builder()
        .withCustomFields({ custom: 'custom' })
        .build();
      expect(entity.hasCustomField('UndefinedCustomField')).toBe(false);
    });

    it('hasCustomField() should return true for a defined custom field', () => {
      const entity = TestEntity.builder()
        .withCustomFields({ custom: 'custom' })
        .build();
      expect(entity.hasCustomField('custom')).toBe(true);
    });

    it('getCustomFields() should return the custom fields', () => {
      const entity = TestEntity.builder()
        .withCustomFields({ custom: 'custom' })
        .build();
      expect(entity.getCustomFields()).toStrictEqual({ custom: 'custom' });
    });

    it('getCustomField() should return the value of the custom field', () => {
      const entity = TestEntity.builder()
        .withCustomFields({ custom: 'custom' })
        .build();
      expect(entity.getCustomField('custom')).toBe('custom');
    });

    it('setCustomField() adds a new custom field in entity', () => {
      const entity = TestEntity.builder().build();
      entity.setCustomField('custom', null);

      expect(entity.getCustomFields()).toEqual({ custom: null });
    });

    it('setCustomField() updates custom field when it exists', () => {
      const entity = TestEntity.builder()
        .withCustomFields({ custom: 'custom' })
        .build();
      entity.setCustomField('custom', 'update');

      expect(entity.getCustomFields()).toEqual({ custom: 'update' });
    });

    it('setCustomField() throws an error when the provided field name exists as a property in entity ', () => {
      const entity = TestEntity.builder().build();
      expect(() =>
        entity.setCustomField('StringProperty', 'ERROR!')
      ).toThrowErrorMatchingInlineSnapshot(
        '"The field name \\"StringProperty\\" is already defined in the entity and cannot be set as custom field."'
      );
    });

    it('custom fields are included on JSON stringify', () => {
      const entity = TestEntity.builder()
        .stringProperty('test')
        .withCustomFields({ custom: 'custom' })
        .build();
      const expected = {
        stringProperty: 'test',
        custom: 'custom'
      };

      expect(JSON.stringify(entity)).toBe(JSON.stringify(expected));
      expect(JSON.parse(JSON.stringify(entity))).toEqual(expected);
    });

    it('isConflictingCustomField', () => {
      const entity = TestEntity.builder()
        .stringProperty('test')
        .withCustomFields({ custom: 'custom' })
        .build();

      expect(entity['isConflictingCustomField']('StringProperty')).toBe(true);
      expect(entity['isConflictingCustomField']('BooleanProperty')).toBe(true);
      expect(entity['isConflictingCustomField']('custom')).toBe(false);
    });
  });
});
