import { CommonEntity, commonEntityApi } from '../test/common-entity';

describe('entity', () => {
  describe('remote state', () => {
    it('setOrInitializeRemoteState() sets remote state on entity', () => {
      const entity = new CommonEntity(commonEntityApi.schema);
      entity.setOrInitializeRemoteState();

      expect(entity['remoteState']).toStrictEqual(entity['asObject']());
      expect(entity.getUpdatedPropertyNames()).toStrictEqual([]);
    });

    it('setOrInitializeRemoteState() sets specific state when passed as parameter', () => {
      const entity = commonEntityApi
        .entityBuilder()
        .int16Property(123)
        .stringProperty('test')
        .build();

      entity.setOrInitializeRemoteState({ StringProperty: 'test' });

      expect(entity.getUpdatedPropertyNames()).toStrictEqual(['int16Property']);
    });

    it('gets state diff when changed, excluding custom fields', () => {
      const entity = commonEntityApi
        .entityBuilder()
        .stringProperty('test')
        .build()
        .setOrInitializeRemoteState();

      entity.stringProperty = 'new';
      entity.int16Property = 123;
      entity.setCustomField('custom', 'custom');

      expect(entity.getUpdatedProperties()).toEqual({
        stringProperty: 'new',
        int16Property: 123
      });
    });

    it('getUpdatedCustomFields() should return only updated custom fields', () => {
      const entity = commonEntityApi
        .entityBuilder()
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
    const entity = commonEntityApi
      .entityBuilder()
      .stringProperty('test')
      .build();
    expect(entity.getCustomFields()).toEqual({});
  });

  describe('custom fields', () => {
    it('getCustomFields() should return empty object when there are no custom fields', () => {
      const entity = commonEntityApi
        .entityBuilder()
        .stringProperty('test')
        .build();
      expect(entity.getCustomFields()).toEqual({});
    });

    it('hasCustomField() should return false for non existing customFields', () => {
      const entity = commonEntityApi
        .entityBuilder()
        .withCustomFields({ custom: 'custom' })
        .build();
      expect(entity.hasCustomField('UndefinedCustomField')).toBe(false);
    });

    it('hasCustomField() should return true for a defined custom field', () => {
      const entity = commonEntityApi
        .entityBuilder()
        .withCustomFields({ custom: 'custom' })
        .build();
      expect(entity.hasCustomField('custom')).toBe(true);
    });

    it('getCustomFields() should return the custom fields', () => {
      const entity = commonEntityApi
        .entityBuilder()
        .withCustomFields({ custom: 'custom' })
        .build();
      expect(entity.getCustomFields()).toStrictEqual({ custom: 'custom' });
    });

    it('getCustomField() should return the value of the custom field', () => {
      const entity = commonEntityApi
        .entityBuilder()
        .withCustomFields({ custom: 'custom' })
        .build();
      expect(entity.getCustomField('custom')).toBe('custom');
    });

    it('setCustomField() adds a new custom field in entity', () => {
      const entity = commonEntityApi.entityBuilder().build();
      entity.setCustomField('custom', null);

      expect(entity.getCustomFields()).toEqual({ custom: null });
    });

    it('setCustomField() updates custom field when it exists', () => {
      const entity = commonEntityApi
        .entityBuilder()
        .withCustomFields({ custom: 'custom' })
        .build();
      entity.setCustomField('custom', 'update');

      expect(entity.getCustomFields()).toEqual({ custom: 'update' });
    });

    it('setCustomField() throws an error when the provided field name exists as a property in entity ', () => {
      const entity = commonEntityApi.entityBuilder().build();
      expect(() =>
        entity.setCustomField('StringProperty', 'ERROR!')
      ).toThrowErrorMatchingInlineSnapshot(
        '"The field name \\"StringProperty\\" is already defined in the entity and cannot be set as custom field."'
      );
    });

    it('custom fields are included on JSON stringify', () => {
      const entity = commonEntityApi
        .entityBuilder()
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
      const entity = commonEntityApi
        .entityBuilder()
        .stringProperty('test')
        .withCustomFields({ custom: 'custom' })
        .build();

      expect(entity['isConflictingCustomField']('StringProperty')).toBe(true);
      expect(entity['isConflictingCustomField']('Int16Property')).toBe(true);
      expect(entity['isConflictingCustomField']('custom')).toBe(false);
    });
  });

  describe('get schema', () => {
    it('should apply singleton pattern for schema', () => {
      const schema1 = commonEntityApi.schema;
      const schema2 = commonEntityApi.schema;
      // the two schemas should have the same reference
      /* eslint-disable-next-line eqeqeq */
      expect(schema1 == schema2).toBeTruthy();
    });
  });
});
