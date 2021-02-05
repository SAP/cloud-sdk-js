import { TestEntity } from '../../../test/test-util/test-services/v4/test-service';
import {
  createOriginalTestEntityData1,
  createTestEntity
} from '../../../test/test-util/test-data';
import { edmToTs } from '../payload-value-converter';
import {
  getEntityNameFromODataContext,
  transformReturnValueForEdmType,
  transformReturnValueForEntity
} from './response-transformers';

describe('Response transformer', () => {
  it('should transform for TestEntity', () => {
    const entityData = createOriginalTestEntityData1();
    const expected = createTestEntity(entityData);

    const actual = transformReturnValueForEntity(entityData, TestEntity);
    expect(actual).toEqual(expected);
  });

  it('should transform for single number', () => {
    const singleNumber = 111;
    const data = { value: singleNumber };

    const actual = transformReturnValueForEdmType(data, val =>
      edmToTs(val.value, 'Edm.Int32')
    );
    expect(actual).toEqual(singleNumber);
  });
});

describe('getEntityNameFromODataContext', () => {
  it('should get entity type', () => {
    const entityName = 'TestEntity';
    const data = { '@odata.context': `$metadata#${entityName}` };
    expect(getEntityNameFromODataContext(data)).toEqual(entityName);
  });

  it('returns undefined for invalid context', () => {
    const data = { '@odata.context': 'invalid' };
    expect(getEntityNameFromODataContext(data)).toEqual(undefined);
  });

  it('returns undefined when no context is provided', () => {
    expect(getEntityNameFromODataContext({})).toEqual(undefined);
  });
});
