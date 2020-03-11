import { asc, desc } from '../../../src';
import { getQueryParametersForOrderBy } from '../../../src/request-builder/request/get-orderby';
import { TestEntity, TestEntitySingleLink } from '../../test-util/test-services/test-service';

describe('get orderby', () => {
  it('is empty for empty orderbys', () => {
    expect(getQueryParametersForOrderBy([])).toEqual({});
  });

  it('for a list of orderbys', () => {
    expect(
      getQueryParametersForOrderBy([
        asc(TestEntity.INT_16_PROPERTY),
        asc(TestEntity.STRING_PROPERTY),
        TestEntity.TO_SINGLE_LINK.orderBy(desc(TestEntitySingleLink.GUID_PROPERTY))
      ]).orderby
    ).toBe('Int16Property asc,StringProperty asc,to_SingleLink/GuidProperty desc');
  });

  it('for complex types', () => {
    expect(
      getQueryParametersForOrderBy([asc(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty), desc(TestEntity.COMPLEX_TYPE_PROPERTY.int16Property)])
        .orderby
    ).toBe('ComplexTypeProperty/StringProperty asc,ComplexTypeProperty/Int16Property desc');
  });

  it('for complex nested types', () => {
    expect(getQueryParametersForOrderBy([asc(TestEntity.COMPLEX_TYPE_PROPERTY.complexTypeProperty.stringProperty)]).orderby).toBe(
      'ComplexTypeProperty/ComplexTypeProperty/StringProperty asc'
    );
  });
});
