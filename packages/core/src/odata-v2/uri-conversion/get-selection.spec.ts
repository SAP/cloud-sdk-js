import {
  TestEntity,
  TestEntityLvl2MultiLink,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '../../../test/test-util/test-services/v2/test-service';
import { getQueryParametersForSelection } from './get-selection';

describe('get selection', () => {
  it('is empty for empty selection', () => {
    expect(getQueryParametersForSelection([])).toEqual({});
  });

  it('for simple selects', () => {
    expect(
      getQueryParametersForSelection([
        TestEntity.STRING_PROPERTY,
        TestEntity.BOOLEAN_PROPERTY
      ]).select
    ).toBe('StringProperty,BooleanProperty');
  });

  it('removes redundancy for selection of all fields', () => {
    expect(
      getQueryParametersForSelection([
        TestEntity.ALL_FIELDS,
        TestEntity.BOOLEAN_PROPERTY
      ]).select
    ).toBe('*');
  });

  it('for multilevel selects', () => {
    const params = getQueryParametersForSelection([
      TestEntity.STRING_PROPERTY,
      TestEntity.BOOLEAN_PROPERTY,
      TestEntity.TO_SINGLE_LINK.select(TestEntitySingleLink.STRING_PROPERTY)
    ]);
    expect(params.select).toBe(
      'StringProperty,BooleanProperty,to_SingleLink/StringProperty'
    );
    expect(params.expand).toBe('to_SingleLink');
  });

  it('for nested multilevel selects', () => {
    const params = getQueryParametersForSelection([
      TestEntity.STRING_PROPERTY,
      TestEntity.BOOLEAN_PROPERTY,
      TestEntity.TO_MULTI_LINK.select(
        TestEntityMultiLink.TO_MULTI_LINK.select(
          TestEntityLvl2MultiLink.INT_16_PROPERTY
        )
      )
    ]);
    expect(params.select).toBe(
      'StringProperty,BooleanProperty,to_MultiLink/to_MultiLink/Int16Property'
    );
    expect(params.expand).toBe('to_MultiLink,to_MultiLink/to_MultiLink');
  });

  it('multilevel selects are not removed when * is selected', () => {
    const params = getQueryParametersForSelection([
      TestEntity.ALL_FIELDS,
      TestEntity.BOOLEAN_PROPERTY,
      TestEntity.TO_SINGLE_LINK.select(TestEntitySingleLink.STRING_PROPERTY)
    ]);
    expect(params.select).toBe('*,to_SingleLink/StringProperty');
    expect(params.expand).toBe('to_SingleLink');
  });

  it('multilevel selects are not removed when there is a multilevel all field selection', () => {
    const params = getQueryParametersForSelection([
      TestEntity.BOOLEAN_PROPERTY,
      TestEntity.TO_SINGLE_LINK.select(
        TestEntitySingleLink.ALL_FIELDS,
        TestEntitySingleLink.INT_16_PROPERTY
      )
    ]);
    expect(params.select).toBe('to_SingleLink/*,BooleanProperty');
    expect(params.expand).toBe('to_SingleLink');
  });

  it('for selects link entity', () => {
    const params = getQueryParametersForSelection([
      TestEntity.STRING_PROPERTY,
      TestEntity.TO_SINGLE_LINK
    ]);
    expect(params.select).toBe('to_SingleLink/*,StringProperty');
    expect(params.expand).toBe('to_SingleLink');
  });

  it('for select all field link entity ', () => {
    const params = getQueryParametersForSelection([
      TestEntity.STRING_PROPERTY,
      TestEntity.TO_SINGLE_LINK.select(TestEntitySingleLink.ALL_FIELDS)
    ]);
    expect(params.select).toBe('to_SingleLink/*,StringProperty');
    expect(params.expand).toBe('to_SingleLink');
  });

  it('for custom field selects', () => {
    expect(
      getQueryParametersForSelection([
        TestEntity.customField('SomeCustomField'),
        TestEntity.BOOLEAN_PROPERTY
      ]).select
    ).toBe('SomeCustomField,BooleanProperty');
  });

  it('hard select with various fields selected', () => {
    expect(
      getQueryParametersForSelection([
        TestEntity.ALL_FIELDS,
        TestEntity.TO_SINGLE_LINK,
        TestEntity.TO_MULTI_LINK.select(TestEntityMultiLink.BOOLEAN_PROPERTY),
        TestEntity.customField('SomeCustomField'),
        TestEntity.BOOLEAN_PROPERTY
      ]).select
    ).toBe('*,to_SingleLink/*,to_MultiLink/BooleanProperty');
  });
});
