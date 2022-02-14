import {
  breakfastEntity,
  foodService
} from '../../../test/test-util/data-model';
import { entityApiFile } from './file';

describe('entity api file', () => {
  it('gets proper file', () => {
    expect(entityApiFile(breakfastEntity, foodService)).toMatchSnapshot();
  });
});
