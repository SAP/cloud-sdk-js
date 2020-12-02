import { TestEntity } from '../../../test/test-util/test-services/v4/test-service';
import {
  createOriginalTestEntityData1,
  createTestEntityV4
} from '../../../test/test-util/test-data';
import { edmToTsV4 } from '../payload-value-converter';
import {
  transformReturnValueForEdmTypeV4,
  transformReturnValueForEntityV4
} from './response-transformers';

describe('Response transformer', () => {
  it('should transform for TestEntity', () => {
    const entityData = createOriginalTestEntityData1();
    const expected = createTestEntityV4(entityData);

    const actual = transformReturnValueForEntityV4(entityData, TestEntity);
    expect(actual).toEqual(expected);
  });

  it('should transform for single number', () => {
    const singleNumber = 111;
    const data = { value: singleNumber };

    const actual = transformReturnValueForEdmTypeV4(data, val =>
      edmToTsV4(val.value, 'Edm.Int32')
    );
    expect(actual).toEqual(singleNumber);
  });
});
