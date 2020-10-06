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

    const responses = await batch(
      getAll.withCustomServicePath('/'),
      changeset(create.withCustomServicePath('/'))
    ).execute(destination);

    expect(responses.length).toBe(2);
    responses.forEach(response => {
      expect(response.isSuccess()).toBe(true);
    });
  });
});
