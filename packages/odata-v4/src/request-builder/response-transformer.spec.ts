import { TestEntity } from '@sap-cloud-sdk/test-services/v4/test-service';
import {
  createOriginalTestEntityData1,
  createTestEntity
} from '../../../core/test/test-util/test-data';
import { edmToTs } from '../payload-value-converter';
import {
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
