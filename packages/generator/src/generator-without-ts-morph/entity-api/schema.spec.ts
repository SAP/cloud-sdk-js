import { breakfastEntity } from '@sap-cloud-sdk/private-test-utils/data-model';
import { getSchema } from './schema';

describe('entity api schema', () => {
  it('gets proper schema', () => {
    expect(getSchema(breakfastEntity)).toMatchSnapshot();
  });
});
