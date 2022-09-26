import { testEntityApi } from '../../test/test-util';
import { getSelect } from './get-select';

describe('get select', () => {
  it('all fields', () => {
    expect(getSelect([testEntityApi.schema.ALL_FIELDS]).select).toBe('*');
  });
  it('should return all selected propertiesmj', () => {
    expect(
      getSelect([
        testEntityApi.schema.STRING_PROPERTY,
        testEntityApi.schema.COMPLEX_TYPE_PROPERTY,
        testEntityApi.customField('TEST_CUSTOM_PROPERTY'),
        testEntityApi.schema.COMPLEX_TYPE_COLLECTION_PROPERTY
      ]).select
    ).toBe('StringProperty,BooleanProperty');
  });
  it('ignore', () => {
    expect(
      getSelect([
        testEntityApi.schema.ALL_FIELDS,
        testEntityApi.schema.STRING_PROPERTY,
        testEntityApi.schema.COMPLEX_TYPE_PROPERTY,
        testEntityApi.customField('TEST_CUSTOM_PROPERTY'),
        testEntityApi.schema.COMPLEX_TYPE_COLLECTION_PROPERTY
      ]).select
    ).toBe('*');
  });
});
