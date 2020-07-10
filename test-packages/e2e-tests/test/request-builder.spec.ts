/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { TestEntity } from '@sap-cloud-sdk/test-services-e2e/v4/admin-service';

const url = 'http://localhost:4004/';
const destination = { url };

describe('Request builder test', () => {
  it('should return a collection of entities for get all request', async () => {
    const testEntities = await TestEntity.requestBuilder()
      .getAll()
      .execute(destination);
    expect(testEntities).toHaveLength(4);
    expect(testEntities).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          keyPropertyInt: 101,
          keyPropertyString: 'aaa'
        }),
        expect.objectContaining({
          keyPropertyInt: 102,
          keyPropertyString: 'aab'
        }),
        expect.objectContaining({
          keyPropertyInt: 103,
          keyPropertyString: 'aac'
        }),
        expect.objectContaining({
          keyPropertyInt: 104,
          keyPropertyString: 'aad'
        })
      ])
    );
  });

  it('should return an entity for get by key request', async () => {
    const testEntity = await TestEntity.requestBuilder()
      .getByKey(101, 'aaa')
      .execute(destination);
    expect(testEntity).toEqual(
      expect.objectContaining({ keyPropertyInt: 101, keyPropertyString: 'aaa' })
    );
  });
});
