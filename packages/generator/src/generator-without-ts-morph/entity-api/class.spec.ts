import {
  breakfastEntity,
  foodService
} from '@sap-cloud-sdk/private-test-utils/data-model';
import { classContent } from './class';

describe('entity api class', () => {
  it('gets proper class content', () => {
    expect(classContent(breakfastEntity, foodService)).toMatchSnapshot();
  });
});
