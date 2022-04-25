import {
  breakfastEntity,
  foodService
} from '@sap-cloud-sdk/private-test-utils/data-model';
import { entityApiFile } from './file';

describe('entity api file', () => {
  it('gets proper file', () => {
    expect(entityApiFile(breakfastEntity, foodService)).toMatchSnapshot();
  });
});
