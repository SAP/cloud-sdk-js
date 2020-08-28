/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { TestEntity } from '@sap-cloud-sdk/test-services-e2e/v4/admin-service';
import moment from 'moment';

const url = 'http://localhost:4004/';
const destination = { url };
interface EntityKey {
  keyString: string;
  keyInt: number;
}
const entityKey = { keyString: 'keyString', keyInt: 123 };

async function queryEntity(key: EntityKey): Promise<TestEntity> {
  return TestEntity.requestBuilder()
    .getByKey(key.keyInt, key.keyString)
    .execute(destination);
}

async function deleteEntity(key: EntityKey): Promise<void> {
  try {
    const fetched = await queryEntity(key);
    return TestEntity.requestBuilder().delete(fetched).execute(destination);
  } catch (e) {
    if(!e.stack.includes('Request failed with status code 404')){
      throw new Error(e)
    }
  }
}

async function createEntity(
  key: EntityKey,
  date: moment.Moment
): Promise<TestEntity> {
  const dataForCreation = TestEntity.builder()
    .keyPropertyInt(key.keyInt)
    .keyPropertyString(key.keyString)
    .dateProperty(date)
    .build();
  return TestEntity.requestBuilder()
    .create(dataForCreation)
    .execute(destination);
}

describe('Request builder test', () => {
  beforeEach(async () => deleteEntity(entityKey));

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

  it('should create an entity', async () => {
    await createEntity(entityKey, moment(0));
    const queried = await queryEntity(entityKey);
    expect(queried.dateProperty?.toISOString()).toBe(moment(0).toISOString());
  });

  it('should update an entity', async () => {
    const created = await createEntity(entityKey, moment(0));
    const newDate = moment.utc('2020-01-01', 'YYYY-MM-DD');
    created.dateProperty = newDate;
    await TestEntity.requestBuilder().update(created).execute(destination);

    const queried = await queryEntity(entityKey);
    expect(queried.dateProperty?.toISOString()).toBe(
      moment(newDate).toISOString()
    );
  });

  xit('should set the version identifier (eTag)', async () => {
    const created = await createEntity(entityKey, moment(0));
    expect(created['_versionIdentifier']).not.toBe(undefined);
  });
});
