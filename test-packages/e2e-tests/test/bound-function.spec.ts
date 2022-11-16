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
      const entity: TestEntity = await request.execute(destination);
      const functionResult = await entity
        .boundFunctionWithoutArguments({})
        .execute(destination);
      expect(functionResult).toEqual(
        'boundFunctionWithoutArguments Result Value'
      );
    });

    it('bound function with arguments returns expected string', async () => {
      const entity: TestEntity = await request.execute(destination);
      const functionResult = await entity
        .boundFunctionWithArguments({ param1: 'foo', param2: 'bar' })
        .execute(destination);
      expect(functionResult).toEqual(
        'boundFunctionWithArguments foo bar Result Value'
      );
    });

    it('bound function without arguments returns expected complex object', async () => {
      const entity: TestEntity = await request.execute(destination);
      const functionResult = await entity
        .boundFunctionWithoutArgumentsComplexReturnType({})
        .execute(destination);
      expect(functionResult).toEqual({
        someMessage:
          'boundFunctionWithoutArgumentsComplexReturnType Result Value',
        someId: 42
      });
    });

    it('bound function of entity with multiple keys returns expected string', async () => {
      const { testEntityWithMultipleKeysApi } = testService();
      const entity: TestEntityWithMultipleKeys =
        await testEntityWithMultipleKeysApi
          .requestBuilder()
          .getByKey(101, 'a', true)
          .execute(destination);

      const functionResult = await entity
        .boundFunctionWithoutArgumentsWithMultipleKeys({})
        .execute(destination);
      expect(functionResult).toEqual(
        'boundFunctionWithoutArgumentsWithMultipleKeys Result Value'
      );
    });
  });
  it('bound function with arguments of entity with multiple keys returns expected string', async () => {
    const { testEntityWithMultipleKeysApi } = testService();
    const entity: TestEntityWithMultipleKeys =
      await testEntityWithMultipleKeysApi
        .requestBuilder()
        .getByKey(101, 'a', true)
        .execute(destination);

    const functionResult = await entity
      .boundFunctionWithArgumentsWithMultipleKeys({
        param1: 'foo',
        param2: 'bar'
      })
      .execute(destination);
    expect(functionResult).toEqual(
      'boundFunctionWithArgumentsWithMultipleKeys foo bar Result Value'
    );
  });
});
