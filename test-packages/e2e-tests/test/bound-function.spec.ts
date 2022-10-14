import {
  TestEntity,
  TestEntityWithMultipleKeys,
  testService
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service';
import { getByKey } from '@sap-cloud-sdk/test-services-e2e/v4/test-service/function-imports';

const url = 'http://localhost:4004/';
const destination = { url };

describe('bound functions', () => {
  describe('integer parameter, returns entity', () => {
    const request = getByKey({
      param: 101
    });

    it('bound function returns expected string', async () => {
      // http://localhost:4004/odata/test-service/TestEntity(KeyTestEntity=1)/TestService.boundFunctionWithoutArguments()
      const expected = {
        '@odata.context': '../$metadata#Edm.String',
        value: 'xyz'
      };
      const entity: TestEntity = await request.execute(destination);
      const functionResult = await entity
        .boundFunctionWithoutArguments()
        .execute(destination);
      expect(functionResult).toEqual(expected);
    });

    it('bound function of entity with multiple keys returns expected string', async () => {
      // http://localhost:4004/odata/test-service/TestEntityWithMultipleKeys(KeyTestEntityWithMultipleKeys=101,StringPropertyWithMultipleKeys='a',BooleanPropertyWithMultipleKeys=true)/TestService.boundFunctionWithoutArgumentsWithMultipleKeys()

      const { testEntityWithMultipleKeysApi } = testService();
      const entity: TestEntityWithMultipleKeys =
        await testEntityWithMultipleKeysApi
          .requestBuilder()
          .getByKey(101, 'a', true)
          .execute(destination);
      const expected = {
        '@odata.context': '../$metadata#Edm.String',
        value: 'xyz'
      };

      const functionResult = await entity
        .boundFunctionWithoutArgumentsWithMultipleKeys()
        .execute(destination);
      expect(functionResult).toEqual(expected);
    });
  });
});
