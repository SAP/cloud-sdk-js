/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';
import { v4 as uuid } from 'uuid';
import { testEntityResourcePath } from '../../../test-util/test-data';
import { TestEntity } from '../../../test-util/test-services/v2/test-service';
import { getResourcePathForKeys } from '../../../../src';

describe('get resource path', () => {
  it('adds keys to path', () => {
    const keyPropGuid = uuid();
    const keyPropString = 'keyProp';
    const keys = {
      KeyPropertyGuid: keyPropGuid,
      KeyPropertyString: keyPropString
    };

    expect(getResourcePathForKeys(keys, TestEntity)).toEqual(
      testEntityResourcePath(keyPropGuid, keyPropString)
    );
  });

  it('throws error if no keys set', () => {
    expect(() =>
      getResourcePathForKeys(undefined, TestEntity)
    ).toThrowErrorMatchingSnapshot();
  });

  it('throws error if not all keys are set', () => {
    const keys = { KeyPropertyGuid: uuid() };

    expect(() =>
      getResourcePathForKeys(keys, TestEntity)
    ).toThrowErrorMatchingSnapshot();
  });

  it('throws error if keys are nullish', () => {
    const keys = { KeyPropertyGuid: null, KeyPropertyString: undefined };

    expect(() =>
      getResourcePathForKeys(keys, TestEntity)
    ).toThrowErrorMatchingSnapshot();
  });

  it('allows values to be empty string', () => {
    const keys = { KeyPropertyGuid: '', KeyPropertyString: '' };

    expect(() => getResourcePathForKeys(keys, TestEntity)).not.toThrow();
  });

  it('ignores additional properties and logs a warning', () => {
    const logger = createLogger('get-resource-path');
    const warnSpy = jest.spyOn(logger, 'warn');
    const keys = {
      KeyPropertyGuid: uuid(),
      KeyPropertyString: '',
      StringProperty: 'test'
    };

    expect(() => getResourcePathForKeys(keys, TestEntity)).not.toThrow();
    expect(warnSpy).toBeCalledWith(
      'There are too many key properties. Ignoring the following keys: StringProperty'
    );
  });
});
