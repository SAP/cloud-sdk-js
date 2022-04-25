import { VariableStatementStructure } from 'ts-morph';
import {
  breakfastEntity,
  breakfastTime,
  entityName,
  foodService,
  numberOfEggs,
  toBrunch
} from '../../test/test-util/data-model';
import { entityNamespace } from './namespace';

describe('entity namespace', () => {
  it('creates namespace', () => {
    const namespace = entityNamespace(breakfastEntity, foodService);

    expect(namespace.name).toEqual(breakfastEntity.className);
    const variableStatements = (
      namespace.statements as VariableStatementStructure[]
    ).map(v => v.declarations[0]);

    expect(variableStatements.map(({ name }) => name)).toEqual(
      expect.arrayContaining([
        entityName.staticPropertyName,
        numberOfEggs.staticPropertyName,
        breakfastTime.staticPropertyName,
        toBrunch.staticPropertyName
      ])
    );
  });
});
