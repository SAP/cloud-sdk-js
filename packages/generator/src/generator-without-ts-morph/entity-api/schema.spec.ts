import { breakfastEntity } from '../../../test/test-util/data-model';
import { getSchema } from './schema';

describe('entity api schema', () => {
  it('gets proper schema', () => {
    expect(getSchema(breakfastEntity)).toMatchSnapshot();
  });
});
