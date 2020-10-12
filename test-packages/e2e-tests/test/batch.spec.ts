import {
  batch,
  changeset,
  TestEntity
} from '@sap-cloud-sdk/test-services-e2e/v4/admin-service';
import { destination } from './test-util';

describe('batch', () => {
  it('should execute retrieve and change set requests', async () => {
    const getAll = TestEntity.requestBuilder().getAll();
    const testEntity = TestEntity.builder()
      .keyTestEntity(123)
      .stringProperty('batch')
      .build();
    const create = TestEntity.requestBuilder().create(testEntity);

    const [retrieveResponse, changesetResponse] = await batch(
      getAll,
      changeset(create)
    )
      .withOptions({ subrequestPath: 'relativeToEntity' })
      .execute(destination);

    expect(retrieveResponse.isSuccess()).toBe(true);
    expect(changesetResponse.isSuccess()).toBe(true);
  });
});
