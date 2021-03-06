import {
  TestEntity,
  TestServiceEntityApi
} from '../../../packages/core/test/test-util/test-services/openapi/test-service';
import { destination } from './test-util';

// TODO: How do I handle paths in rest requests?
// TODO: Transpilation needed + tsconfig needs dom typings
const restDestination = { url: destination.url + 'openapi' };
describe('openapi request builder', () => {
  it('executes getAll request', async () => {
    const request = TestServiceEntityApi.getAllEntities();
    expect(
      (await request.execute(restDestination)).length
    ).toBeGreaterThanOrEqual(4);
  });

  it('executes getAll request', async () => {
    const request = TestServiceEntityApi.getEntityByKey(
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
    );
    expect(await request.execute(restDestination)).toBeDefined();
  });

  it('executes create request', async () => {
    const preCreateCount = await countEntities();
    const testEntity: TestEntity = {
      keyProperty: 'a13e7a92-cb9c-8f4a-b1e1-6b5c8458a9fb',
      stringProperty: 'string'
    };
    await TestServiceEntityApi.createEntity(testEntity).execute(
      restDestination
    );
    const postCreateCount = await countEntities();
    expect(postCreateCount).toEqual(preCreateCount + 1);
  });
});

function countEntities(): Promise<number> {
  return TestServiceEntityApi.countEntities().execute(restDestination);
}
