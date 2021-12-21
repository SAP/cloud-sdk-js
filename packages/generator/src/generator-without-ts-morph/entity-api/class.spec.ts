import {breakfastEntity, foodService} from '../../../test/test-util/data-model';
import { classContent } from './class';

describe('entity api class', () => {
  it('gets proper class content', () => {
    expect(classContent(breakfastEntity,foodService)).toMatchSnapshot();
  });
});
