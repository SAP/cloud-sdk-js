import {
  TestEntity,
  TestServiceApiRequestBuilder
} from '@sap-cloud-sdk/test-services/rest/test-service';
import { destination } from './test-util';

// TODO: How do I handle paths in rest requests?
// TODO: Transpilation needed + tsconfig needs dom typings
// TODO: Response is never "parsed"
const restDestination = { ...destination, url: destination.url + 'rest' };
describe('rest request builder', () => {
  it('executes getAll request', async () => {
    const request = TestServiceApiRequestBuilder.getAllEntities();
    expect(
      (await request.execute(restDestination)).data.length
    ).toBeGreaterThanOrEqual(4);
  });

  it('executes create request', async () => {
    const preCreateCount = await countEntities();
    const testEntity: TestEntity = {
      keyProperty: 'a13e7a92-cb9c-8f4a-b1e1-6b5c8458a9fb',
      stringProperty: 'string'
    };
    await TestServiceApiRequestBuilder.createEntity(testEntity).execute(
      restDestination
    );
    const postCreateCount = await countEntities();
    expect(postCreateCount).toEqual(preCreateCount + 1);
  });
});

async function countEntities(): Promise<number> {
  return (
    await TestServiceApiRequestBuilder.countEntities().execute(restDestination)
  ).data;
}
