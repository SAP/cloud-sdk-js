import {
  TestEntityApi,
  TestEntityLinkApi
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service';
import moment from 'moment';
import { and } from '@sap-cloud-sdk/odata-common/internal';
import { deserializeEntity } from '@sap-cloud-sdk/odata-v4/internal';
import { deleteEntity, queryEntity } from './test-utils/test-entity-operations';
import { destination } from './test-util';

const entityKey = 123;
const entityLinkKey = 987;
const schema = new TestEntityApi().schema;
const requestBuilder = new TestEntityApi().requestBuilder();
const entityBuilder = new TestEntityApi().entityBuilder();
const linkEntityBuilder = new TestEntityLinkApi().entityBuilder();
const linkRequestBuilder = new TestEntityLinkApi().requestBuilder();

async function createEntity(key: number) {
  const dataForCreation = entityBuilder
    .keyTestEntity(key)
    .stringProperty('someValue')
    .dateProperty(moment(0))
    .timeOfDayProperty({ hours: 1, minutes: 2, seconds: 3 })
    .dataTimeOffsetDataTimeProperty(moment(0))
    .build();
  return requestBuilder.create(dataForCreation).execute(destination);
}

describe('Request builder', () => {
  beforeEach(async () => deleteEntity(entityKey, destination));
  beforeEach(async () => deleteEntity(entityKey, destination));

  it('should return a collection of entities for get all request', async () => {
    const testEntities = await requestBuilder
      .getAll()
      .filter(
        and(
          schema.KEY_TEST_ENTITY.greaterOrEqual(101),
          schema.KEY_TEST_ENTITY.lessOrEqual(104),
          schema.KEY_TEST_ENTITY.notEquals(102)
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
    const testEntity = await requestBuilder.getByKey(101).execute(destination);
    expect(testEntity).toEqual(expect.objectContaining({ keyTestEntity: 101 }));
  });

  it('should return one to many navigation property of an entity', async () => {
    const multiLinks = (
      await requestBuilder
        .getByKey(101)
        .appendPath('/ToMultiLink')
        .executeRaw(destination)
    ).data.value as any[];
    const actual = multiLinks.map(multiLink =>
      deserializeEntity(multiLink, new TestEntityLinkApi())
    );

    expect(actual).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ keyToTestEntity: 101 })
      ])
    );
  });

  it('should create an entity and a link as child of the entity', async () => {
    const testEntity = await createEntity(entityKey);

    const entityLink = linkEntityBuilder
      .keyTestEntityLink(entityLinkKey)
      .build();

    await linkRequestBuilder
      .create(entityLink)
      .asChildOf(testEntity, schema.TO_MULTI_LINK)
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
    const newEntity = entityBuilder
      .keyTestEntity(entityKey)
      .stringProperty(null)
      .dateProperty(newDate)
      .build();
    await requestBuilder.update(newEntity).execute(destination);

    const queriedAfterUpdate = await queryEntity(entityKey, destination);
    expect(queriedAfterUpdate.stringProperty).toBe(null);
    expect(queriedAfterUpdate.dateProperty!.toISOString()).toBe(
      moment(newDate).toISOString()
    );
  });

  it('should create an entity with related entities (deep create)', async () => {
    const entity = entityBuilder
      .keyTestEntity(entityKey)
      .toMultiLink([
        linkEntityBuilder
          .keyToTestEntity(entityKey)
          .keyTestEntityLink(20)
          .build(),
        linkEntityBuilder
          .keyToTestEntity(entityKey)
          .keyTestEntityLink(30)
          .build()
      ])
      .build();

    await requestBuilder.create(entity).execute(destination);
    const queried = await queryEntity(entityKey, destination);
    expect(queried.toMultiLink.length).toBe(2);
    expect(queried.toMultiLink.map(link => link.keyTestEntityLink)).toEqual([
      20, 30
    ]);
  });

  it('should create an entity with related entities via asChildOf()', async () => {
    const parent = await createEntity(entityKey);
    const child = linkEntityBuilder
      .keyToTestEntity(entityKey)
      .keyTestEntityLink(20)
      .build();

    await linkRequestBuilder
      .create(child)
      .asChildOf(parent, schema.TO_MULTI_LINK)
      .execute(destination);
    const parentWithChild = await queryEntity(entityKey, destination);
    expect(parentWithChild.toMultiLink.length).toBe(1);
    expect(parentWithChild.toMultiLink[0].keyTestEntityLink).toBe(20);
  });

  // CAP only supports OData 4.0
  it('should update an entity including existing related entities', async () => {
    const entity = entityBuilder
      .keyTestEntity(entityKey)
      .stringProperty('oldValueParent')
      .toMultiLink([
        linkEntityBuilder
          .keyToTestEntity(entityKey)
          .keyTestEntityLink(20)
          .stringProperty('oldValueChild')
          .build()
      ])
      .build();
    await requestBuilder.create(entity).execute(destination);
    const beforeUpdate = await queryEntity(entityKey, destination);
    beforeUpdate.stringProperty = 'newValueParent';
    beforeUpdate.toMultiLink[0].stringProperty = 'newValueChild';
    await requestBuilder.update(beforeUpdate).execute(destination);

    const afterUpdate = await queryEntity(entityKey, destination);
    expect(afterUpdate.stringProperty).toBe('newValueParent');
    expect(afterUpdate.toMultiLink[0].stringProperty).toBe('newValueChild');
  });

  // CAP only supports OData 4.0
  it('should update an entity with related entities (deep update)', async () => {
    await createEntity(entityKey);
    const withoutAssociation = await queryEntity(entityKey, destination);
    withoutAssociation.toMultiLink = [
      linkEntityBuilder.keyToTestEntity(entityKey).keyTestEntityLink(20).build()
    ];
    withoutAssociation.stringProperty = 'newValue';
    await requestBuilder.update(withoutAssociation).execute(destination);

    const afterUpdate = await queryEntity(entityKey, destination);
    expect(afterUpdate.stringProperty).toBe('newValue');
    expect(afterUpdate.toMultiLink.length).toBe(1);
    expect(afterUpdate.toMultiLink[0].keyTestEntityLink).toBe(20);
  });

  it('should count the entities', async () => {
    const result = await requestBuilder.getAll().count().execute(destination);
    expect(result).toBeGreaterThan(2);

    const resultTopped = await requestBuilder
      .getAll()
      .top(3)
      .count()
      .execute(destination);
    expect(resultTopped).toBeGreaterThan(3);

    const resultFiltered = await requestBuilder
      .getAll()
      .filter(schema.STRING_PROPERTY.equals('Edgar Allen Poe'))
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
