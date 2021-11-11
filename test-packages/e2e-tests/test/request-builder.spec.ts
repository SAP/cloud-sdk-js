import {
  TestEntity,
  TestEntityLink
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service';
import moment from 'moment';
import { and } from '@sap-cloud-sdk/odata-common';
import { deserializeEntity } from '@sap-cloud-sdk/odata-v4/dist/entity-deserializer';
import { deleteEntity, queryEntity } from './test-utils/test-entity-operations';
import { destination } from './test-util';

const entityKey = 123;
const entityLinkKey = 987;

async function createEntity(key: number): Promise<TestEntity> {
  const dataForCreation = TestEntity.builder()
    .keyTestEntity(key)
    .stringProperty('someValue')
    .dateProperty(moment(0))
    .timeOfDayProperty({ hours: 1, minutes: 2, seconds: 3 })
    .dataTimeOffsetDataTimeProperty(moment(0))
    .build();
  return TestEntity.requestBuilder()
    .create(dataForCreation)
    .execute(destination);
}

describe('Request builder', () => {
  beforeEach(async () => deleteEntity(entityKey, destination));
  beforeEach(async () => deleteEntity(entityKey, destination));

  it('should return a collection of entities for get all request', async () => {
    const testEntities = await TestEntity.requestBuilder()
      .getAll()
      .filter(
        and(
          TestEntity.KEY_TEST_ENTITY.greaterOrEqual(101),
          TestEntity.KEY_TEST_ENTITY.lessOrEqual(104),
          TestEntity.KEY_TEST_ENTITY.notEquals(102)
        )
      )
      .execute(destination);
    expect(testEntities).toHaveLength(3);
    expect(testEntities).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          keyTestEntity: 101
        }),
        expect.not.objectContaining({
          keyTestEntity: 102
        }),
        expect.objectContaining({
          keyTestEntity: 103
        }),
        expect.objectContaining({
          keyTestEntity: 104
        })
      ])
    );
  });

  it('should return an entity for get by key request', async () => {
    const testEntity = await TestEntity.requestBuilder()
      .getByKey(101)
      .execute(destination);
    expect(testEntity).toEqual(expect.objectContaining({ keyTestEntity: 101 }));
  });

  it('should return one to many navigation property of an entity', async () => {
    const multiLinks = (
      await TestEntity.requestBuilder()
        .getByKey(101)
        .appendPath('/ToMultiLink')
        .executeRaw(destination)
    ).data.value as any[];
    const actual = multiLinks.map(multiLink =>
      deserializeEntity(multiLink, TestEntityLink)
    );

    expect(actual).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ keyToTestEntity: 101 })
      ])
    );
  });

  it('should create an entity and a link as child of the entity', async () => {
    const testEntity = await createEntity(entityKey);

    const entityLink = TestEntityLink.builder()
      .keyTestEntityLink(entityLinkKey)
      .build();

    await TestEntityLink.requestBuilder()
      .create(entityLink)
      .asChildOf(testEntity, TestEntity.TO_MULTI_LINK)
      .execute(destination);

    const queried = await queryEntity(entityKey, destination);

    expect(queried.dateProperty?.toISOString()).toBe(moment(0).toISOString());
    expect(queried.toMultiLink).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          keyTestEntityLink: entityLinkKey,
          keyToTestEntity: entityKey
        })
      ])
    );
  });

  it('should update an entity', async () => {
    await createEntity(entityKey);

    const queriedBeforeUpdate = await queryEntity(entityKey, destination);
    expect(queriedBeforeUpdate.stringProperty).not.toBe(null);

    const newDate = moment.utc('2020-01-01', 'YYYY-MM-DD');
    const newEntity = TestEntity.builder()
      .keyTestEntity(entityKey)
      .stringProperty(null)
      .dateProperty(newDate)
      .build();
    await TestEntity.requestBuilder().update(newEntity).execute(destination);

    const queriedAfterUpdate = await queryEntity(entityKey, destination);
    expect(queriedAfterUpdate.stringProperty).toBe(null);
    expect(queriedAfterUpdate.dateProperty!.toISOString()).toBe(
      moment(newDate).toISOString()
    );
  });

  it('should create an entity with related entities (deep create)', async () => {
    const entity = TestEntity.builder()
      .keyTestEntity(entityKey)
      .toMultiLink([
        TestEntityLink.builder()
          .keyToTestEntity(entityKey)
          .keyTestEntityLink(20)
          .build(),
        TestEntityLink.builder()
          .keyToTestEntity(entityKey)
          .keyTestEntityLink(30)
          .build()
      ])
      .build();

    await TestEntity.requestBuilder().create(entity).execute(destination);
    const queried = await queryEntity(entityKey, destination);
    expect(queried.toMultiLink.length).toBe(2);
    expect(queried.toMultiLink.map(link => link.keyTestEntityLink)).toEqual([
      20, 30
    ]);
  });

  it('should create an entity with related entities via asChildOf()', async () => {
    const parent = await createEntity(entityKey);
    const child = TestEntityLink.builder()
      .keyToTestEntity(entityKey)
      .keyTestEntityLink(20)
      .build();

    await TestEntityLink.requestBuilder()
      .create(child)
      .asChildOf(parent, TestEntity.TO_MULTI_LINK)
      .execute(destination);
    const parentWithChild = await queryEntity(entityKey, destination);
    expect(parentWithChild.toMultiLink.length).toBe(1);
    expect(parentWithChild.toMultiLink[0].keyTestEntityLink).toBe(20);
  });

  // CAP only supports OData 4.0
  it('should update an entity including existing related entities', async () => {
    const entity = TestEntity.builder()
      .keyTestEntity(entityKey)
      .stringProperty('oldValueParent')
      .toMultiLink([
        TestEntityLink.builder()
          .keyToTestEntity(entityKey)
          .keyTestEntityLink(20)
          .stringProperty('oldValueChild')
          .build()
      ])
      .build();
    await TestEntity.requestBuilder().create(entity).execute(destination);
    const beforeUpdate = await queryEntity(entityKey, destination);
    beforeUpdate.stringProperty = 'newValueParent';
    beforeUpdate.toMultiLink[0].stringProperty = 'newValueChild';
    await TestEntity.requestBuilder().update(beforeUpdate).execute(destination);

    const afterUpdate = await queryEntity(entityKey, destination);
    expect(afterUpdate.stringProperty).toBe('newValueParent');
    expect(afterUpdate.toMultiLink[0].stringProperty).toBe('newValueChild');
  });

  // CAP only supports OData 4.0
  it('should update an entity with related entities (deep update)', async () => {
    await createEntity(entityKey);
    const withoutAssociation = await queryEntity(entityKey, destination);
    withoutAssociation.toMultiLink = [
      TestEntityLink.builder()
        .keyToTestEntity(entityKey)
        .keyTestEntityLink(20)
        .build()
    ];
    withoutAssociation.stringProperty = 'newValue';
    await TestEntity.requestBuilder()
      .update(withoutAssociation)
      .execute(destination);

    const afterUpdate = await queryEntity(entityKey, destination);
    expect(afterUpdate.stringProperty).toBe('newValue');
    expect(afterUpdate.toMultiLink.length).toBe(1);
    expect(afterUpdate.toMultiLink[0].keyTestEntityLink).toBe(20);
  });

  it('should count the entities', async () => {
    const result = await TestEntity.requestBuilder()
      .getAll()
      .count()
      .execute(destination);
    expect(result).toBeGreaterThan(2);

    const resultTopped = await TestEntity.requestBuilder()
      .getAll()
      .top(3)
      .count()
      .execute(destination);
    expect(resultTopped).toBeGreaterThan(3);

    const resultFiltered = await TestEntity.requestBuilder()
      .getAll()
      .filter(TestEntity.STRING_PROPERTY.equals('Edgar Allen Poe'))
      .count()
      .execute(destination);
    expect(resultFiltered).toBe(1);
  });

  // CAP seems to not set the etag
  xit('should set the version identifier (eTag)', async () => {
    const created = await createEntity(entityKey);
    expect(created['_versionIdentifier']).not.toBe(undefined);
  });
});
