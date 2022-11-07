import {
  TestEntity,
  TestEntityWithMultipleKeys,
  testService
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service';
import { getByKey } from '@sap-cloud-sdk/test-services-e2e/v4/test-service/function-imports';

const url = 'http://localhost:4004/';
const destination = { url };

describe('bound actions', () => {
  describe('integer parameter, returns entity', () => {
    const request = getByKey({
      param: 101
    });

    it('bound action returns expected string', async () => {
      const entity: TestEntity = await request.execute(destination);
      const actionResult = await entity
        .boundActionWithoutArguments({})
        .execute(destination);
      expect(actionResult).toEqual('boundActionWithoutArguments Result Value');
    });

    it('bound action of entity with multiple keys returns expected string', async () => {
      const { testEntityWithMultipleKeysApi } = testService();
      const entity: TestEntityWithMultipleKeys =
        await testEntityWithMultipleKeysApi
          .requestBuilder()
          .getByKey(101, 'a', true)
          .execute(destination);

      const actionResult = await entity
        .boundActionWithoutArgumentsWithMultipleKeys({})
        .execute(destination);
      expect(actionResult).toEqual(
        'boundActionWithoutArgumentsWithMultipleKeys Result Value'
      );
    });
  });
});
