import {
  batch,
  changeset,
  TestEntity
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service';
import { destination } from './test-util';
import { deleteEntity } from './test-utils/test-entity-operations';

const entityKey = 456;

describe('batch', () => {
  beforeEach(async () => deleteEntity(entityKey, destination));
  afterEach(async () => deleteEntity(entityKey, destination));

  it('should execute retrieve and change set requests', async () => {
    const getAll = TestEntity.requestBuilder().getAll();
    const testEntity = TestEntity.builder()
      .keyTestEntity(entityKey)
      .stringProperty('batch')
      .build();
    const create = TestEntity.requestBuilder().create(testEntity);
    const deleteRequestBuilder = TestEntity.requestBuilder().delete(entityKey);

    const [retrieveResponse, changesetResponse] = await batch(
      getAll,
      changeset(create)
    )
      .withSubRequestPathType('relativeToEntity')
      .execute(destination);

    const [deleteRes] = await batch(changeset(deleteRequestBuilder))
      .withSubRequestPathType('relativeToEntity')
      .execute(destination);

    expect(retrieveResponse.isSuccess()).toBe(true);
    expect(changesetResponse.isSuccess()).toBe(true);
    expect(deleteRes.isSuccess()).toBe(true);
  });
});
