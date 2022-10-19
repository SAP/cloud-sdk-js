import {
  testEntityApi,
  testEntityLvl2MultiLinkApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../../test/test-util';
import { getSelect } from './get-select';

describe('get select', () => {
  it('should return all properties that do not select any specific property', () => {
    expect(
      getSelect([
        testEntityApi.schema.ALL_FIELDS,
        testEntityApi.schema.TO_SINGLE_LINK,
        testEntityApi.schema.TO_MULTI_LINK
      ]).select
    ).toBe('*,to_SingleLink/*,to_MultiLink/*');
  });

  it('should return all properties', () => {
    expect(
      getSelect([
        testEntityApi.schema.STRING_PROPERTY,
        testEntityApi.schema.TO_SINGLE_LINK,
        testEntityApi.schema.COMPLEX_TYPE_PROPERTY,
        testEntityApi.customField('TEST_CUSTOM_PROPERTY')
      ]).select
    ).toBe(
      'to_SingleLink/*,StringProperty,ComplexTypeProperty,TEST_CUSTOM_PROPERTY'
    );
  });

  it('should return only a selection of all fields', () => {
    expect(
      getSelect([
        testEntityApi.schema.ALL_FIELDS,
        testEntityApi.schema.STRING_PROPERTY
      ]).select
    ).toBe('*');
  });

  it('should return all selected properties of single link', () => {
    expect(
      getSelect([
        testEntityApi.schema.TO_SINGLE_LINK.select(
          testEntitySingleLinkApi.schema.STRING_PROPERTY,
          testEntitySingleLinkApi.schema.BOOLEAN_PROPERTY
        )
      ]).select
    ).toBe('to_SingleLink/StringProperty,to_SingleLink/BooleanProperty');
  });

  it('should return all selected properties of multi link', () => {
    expect(
      getSelect([
        testEntityApi.schema.TO_MULTI_LINK.select(
          testEntityMultiLinkApi.schema.STRING_PROPERTY,
          testEntityMultiLinkApi.schema.BOOLEAN_PROPERTY
        )
      ]).select
    ).toBe('to_MultiLink/StringProperty,to_MultiLink/BooleanProperty');
  });

  it('returns a nested selected property', () => {
    expect(
      getSelect([
        testEntityApi.schema.TO_SINGLE_LINK.select(
          testEntitySingleLinkApi.schema.TO_MULTI_LINK.select(
            testEntityLvl2MultiLinkApi.schema.STRING_PROPERTY
          )
        )
      ]).select
    ).toBe('to_SingleLink/to_MultiLink/StringProperty');
  });
});
