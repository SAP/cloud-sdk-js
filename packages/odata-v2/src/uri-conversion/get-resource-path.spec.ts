import { randomUUID } from 'node:crypto';
import { createLogger } from '@sap-cloud-sdk/util';
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
    const keyPropGuid = randomUUID();
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
    ).toThrowErrorMatchingInlineSnapshot(
      '"Cannot get resource path for entity A_TestEntity. The following keys are missing: KeyPropertyGuid, KeyPropertyString"'
    );
  });

  it('throws error if not all keys are set', () => {
    const keys = { KeyPropertyGuid: randomUUID() };

    expect(() =>
      getResourcePathForKeys(keys, testEntityApi)
    ).toThrowErrorMatchingInlineSnapshot(
      '"Cannot get resource path for entity A_TestEntity. The following keys are missing: KeyPropertyString"'
    );
  });

  it('throws error if keys are nullish', () => {
    const keys = { KeyPropertyGuid: null, KeyPropertyString: undefined };

    expect(() =>
      getResourcePathForKeys(keys, testEntityApi)
    ).toThrowErrorMatchingInlineSnapshot(
      '"Cannot get resource path for entity A_TestEntity. The following keys have nullish values, but are not nullable: KeyPropertyGuid, KeyPropertyString"'
    );
  });

  it('allows values to be empty string', () => {
    const keys = { KeyPropertyGuid: '', KeyPropertyString: '' };

    expect(() => getResourcePathForKeys(keys, testEntityApi)).not.toThrow();
  });

  it('ignores additional properties and logs a warning', () => {
    const logger = createLogger('get-resource-path');
    const warnSpy = jest.spyOn(logger, 'warn');
    const keys = {
      KeyPropertyGuid: randomUUID(),
      KeyPropertyString: '',
      StringProperty: 'test'
    };

    expect(() => getResourcePathForKeys(keys, testEntityApi)).not.toThrow();
    expect(warnSpy).toHaveBeenCalledWith(
      'There are too many key properties. Ignoring the following keys: StringProperty'
    );
  });

  it('URI encodes keys with special characters', () => {
    const keys = {
      KeyPropertyGuid: randomUUID(),
      KeyPropertyString: 'DEV?TEST06'
    };
    const expected =
      /A_TestEntity\(KeyPropertyGuid=guid'\w{8}-\w{4}-\w{4}-\w{4}-\w{12}',KeyPropertyString='DEV%3FTEST06'\)/;

    expect(getResourcePathForKeys(keys, testEntityApi)).toMatch(expected);
  });

  it('URI encodes keys containing single quote', () => {
    const keys = {
      KeyPropertyGuid: randomUUID(),
      KeyPropertyString: "DEV'TEST06"
    };
    const expected =
      /A_TestEntity\(KeyPropertyGuid=guid'\w{8}-\w{4}-\w{4}-\w{4}-\w{12}',KeyPropertyString='DEV''TEST06'\)/;

    expect(getResourcePathForKeys(keys, testEntityApi)).toMatch(expected);
  });

  it('URI encodes keys containing path segment separator', () => {
    const keys = {
      KeyPropertyGuid: randomUUID(),
      KeyPropertyString: 'DEV/TEST06'
    };
    const expected =
      /A_TestEntity\(KeyPropertyGuid=guid'\w{8}-\w{4}-\w{4}-\w{4}-\w{12}',KeyPropertyString='DEV%2FTEST06'\)/;

    expect(getResourcePathForKeys(keys, testEntityApi)).toMatch(expected);
  });
});
