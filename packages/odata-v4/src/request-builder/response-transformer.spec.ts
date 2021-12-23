import {
  createOriginalTestEntityData1,
  createTestEntity
} from '../../../../test-resources/test/test-util/test-data';
import { defaultDeSerializers, edmToTs } from '../de-serializers';
import { testEntityApi } from '../../test/test-util';
import {
  transformReturnValueForEdmType,
  transformReturnValueForEntity
} from './response-transformers';

describe('Response transformer', () => {
  it('should transform for TestEntity', () => {
    const entityData = createOriginalTestEntityData1();
    const expected = createTestEntity(entityData);

    const actual = transformReturnValueForEntity(entityData, testEntityApi);
    expect(actual).toEqual(expected);
  });

  it('should transform for single number', () => {
    const singleNumber = 111;
    const data = { value: singleNumber };

    const actual = transformReturnValueForEdmType(data, val =>
      edmToTs(val.value, 'Edm.Int32', defaultDeSerializers)
    );
    expect(actual).toEqual(singleNumber);
  });
});
