import { createLogger } from '@sap-cloud-sdk/util';
import { v4 as uuid } from 'uuid';
import {
  createGetResourcePathForKeys,
  createUriConverter
} from '@sap-cloud-sdk/odata-common/internal';
import { defaultDeSerializers } from '../de-serializers';
import { testEntityApi, testEntityResourcePath } from '../../test/test-util';

const uriConverter = createUriConverter(defaultDeSerializers);
const { getResourcePathForKeys } = createGetResourcePathForKeys(uriConverter);

describe('get resource path', () => {
  it('adds keys to path', () => {
    const keyPropGuid = uuid();
    const keyPropString = 'keyProp';
    const keys = {
      KeyPropertyGuid: keyPropGuid,
      KeyPropertyString: keyPropString
    };

    expect(getResourcePathForKeys(keys, testEntityApi)).toEqual(
      testEntityResourcePath(keyPropGuid, keyPropString)
    );
  });

  it('throws error if no keys set', () => {
    expect(() =>
      getResourcePathForKeys({}, testEntityApi)
    ).toThrowErrorMatchingSnapshot();
  });

  it('throws error if not all keys are set', () => {
    const keys = { KeyPropertyGuid: uuid() };

    expect(() =>
      getResourcePathForKeys(keys, testEntityApi)
    ).toThrowErrorMatchingSnapshot();
  });

  it('throws error if keys are nullish', () => {
    const keys = { KeyPropertyGuid: null, KeyPropertyString: undefined };

    expect(() =>
      getResourcePathForKeys(keys, testEntityApi)
    ).toThrowErrorMatchingSnapshot();
  });

  it('allows values to be empty string', () => {
    const keys = { KeyPropertyGuid: '', KeyPropertyString: '' };

    expect(() => getResourcePathForKeys(keys, testEntityApi)).not.toThrow();
  });

  it('ignores additional properties and logs a warning', () => {
    const logger = createLogger('get-resource-path');
    const warnSpy = jest.spyOn(logger, 'warn');
    const keys = {
      KeyPropertyGuid: uuid(),
      KeyPropertyString: '',
      StringProperty: 'test'
    };

    expect(() => getResourcePathForKeys(keys, testEntityApi)).not.toThrow();
    expect(warnSpy).toBeCalledWith(
      'There are too many key properties. Ignoring the following keys: StringProperty'
    );
  });

  it('URI encodes keys with special characters', () => {
    const keys = {
      KeyPropertyGuid: uuid(),
      KeyPropertyString: 'DEV?TEST06'
    };
    const expected =
      /A_TestEntity\(KeyPropertyGuid=guid'\w{8}-\w{4}-\w{4}-\w{4}-\w{12}',KeyPropertyString='DEV%3FTEST06'\)/;

    expect(getResourcePathForKeys(keys, testEntityApi)).toMatch(expected);
  });
});
