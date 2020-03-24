/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { v4 as uuid } from 'uuid';
import { getEntityKeys } from '../../../src/request-builder/request/get-keys';
import { TestEntity } from '../../test-util/test-services/test-service';

describe('extractEntityKeys', () => {
  it('should extract entity keys correctly', () => {
    const entity = TestEntity.builder()
      .keyPropertyGuid(uuid())
      .keyPropertyString('987654321')
      .stringProperty('any')
      .build();

    const actual = getEntityKeys(entity, TestEntity);

    expect(actual).toEqual({
      KeyPropertyGuid: entity.keyPropertyGuid,
      KeyPropertyString: entity.keyPropertyString
    });
  });
});
