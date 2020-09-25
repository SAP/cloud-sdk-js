import {
  TestEntity,
  TestEntityLink
} from '@sap-cloud-sdk/test-services-e2e/v4/admin-service';
import moment from 'moment';

const url = 'http://localhost:4004/';
const destination = { url };
interface EntityKey {
  keyString: string;
  keyInt: number;
}
const entityKey = 123;
const entityLinkKey = 987;

async function queryEntity(key: number): Promise<TestEntity> {
  return TestEntity.requestBuilder()
    .getByKey(key)
    .expand(TestEntity.TO_MULTI_LINK)
    .execute(destination);
}

async function deleteEntity(key: number): Promise<void> {
  try {
    const fetched = await queryEntity(key);
    await Promise.all(
      fetched.toMultiLink.map(link =>
        TestEntityLink.requestBuilder().delete(link).execute(destination)
      )
    );
    return TestEntity.requestBuilder().delete(fetched).execute(destination);
  } catch (e) {
    if (!e.stack.includes('Request failed with status code 404')) {
      throw new Error(e);
    }
  }
}

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
          keyTestEntity: 101
        }),
        expect.objectContaining({
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

  it('should create an entity and a link as child of the entity', async () => {
    const testEntity = await createEntity(entityKey);

    const entityLink = TestEntityLink.builder()
      .keyTestEntityLink(entityLinkKey)
      .build();

    await TestEntityLink.requestBuilder()
      .create(entityLink)
      .asChildOf(testEntity, TestEntity.TO_MULTI_LINK)
      .execute(destination);

    const queried = await queryEntity(entityKey);

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
    const created = await createEntity(entityKey);
    const newDate = moment.utc('2020-01-01', 'YYYY-MM-DD');
    created.dateProperty = newDate;
    await TestEntity.requestBuilder().update(created).execute(destination);

    const queried = await queryEntity(entityKey);
    expect(queried.dateProperty?.toISOString()).toBe(
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
    const quried = await queryEntity(entityKey);
    expect(quried.toMultiLink.length).toBe(2);
    expect(quried.toMultiLink.map(link => link.keyTestEntityLink)).toEqual([
      20,
      30
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
    const parentWithChild = await queryEntity(entityKey);
    expect(parentWithChild.toMultiLink.length).toBe(1);
    expect(parentWithChild.toMultiLink[0].keyTestEntityLink).toBe(20);
  });

  // Only supported in OData 4.01 and CAP is 4.0
  xit('should update an entity including existing related entites', async () => {
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
    const beforeUpdate = await queryEntity(entityKey);
    beforeUpdate.stringProperty = 'newValueParent';
    beforeUpdate.toMultiLink[0].stringProperty = 'newValueChild';
    await TestEntity.requestBuilder().update(beforeUpdate).execute(destination);

    const afterUpdate = await queryEntity(entityKey);
    expect(afterUpdate.stringProperty).toBe('newValueParent');
    expect(afterUpdate.toMultiLink[0].stringProperty).toBe('newValueChild');
  });

  // Only supported in OData 4.01 and CAP is 4.0
  xit('should update an entity with related entities (deep update)', async () => {
    await createEntity(entityKey);
    const withoutAssociation = await queryEntity(entityKey);
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

    const afterUpdate = await queryEntity(entityKey);
    expect(afterUpdate.stringProperty).toBe('newValue');
    expect(afterUpdate.toMultiLink.length).toBe(1);
    expect(afterUpdate.toMultiLink[0].keyTestEntityLink).toBe(20);
  });

  // CAP seems not to set the etag
  xit('should set the version identifier (eTag)', async () => {
    const created = await createEntity(entityKey);
    expect(created['_versionIdentifier']).not.toBe(undefined);
  });
});
