/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { toBatchRetrieveBodyV2 } from '../../src/odata/v2';
import { TestEntity } from '../test-util/test-services/v2/test-service';

describe('batch retrieve request', () => {
  describe('toBatchRetrieveBodyV2', () => {
    it('serializes getAll request', () => {
      const getAllRequest = TestEntity.requestBuilder().getAll();
      expect(toBatchRetrieveBodyV2(getAllRequest)).toMatchSnapshot();
    });

    it('serializes getByKey request', () => {
      const getByKeyRequest = TestEntity.requestBuilder().getByKey(
        'testId',
        'test'
      );
      expect(toBatchRetrieveBodyV2(getByKeyRequest)).toMatchSnapshot();
    });
  });
});
