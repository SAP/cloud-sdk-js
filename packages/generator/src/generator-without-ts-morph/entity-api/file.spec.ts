import {
  breakfastEntity, foodService
} from '../../../test/test-util/data-model';
import { file } from './file';

describe('entity api file', () => {
  it('gets proper file', () => {
    expect(file(breakfastEntity, foodService)).toMatchSnapshot();
  });
});
