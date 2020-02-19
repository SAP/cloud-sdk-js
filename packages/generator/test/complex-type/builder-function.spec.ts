import { StructureKind } from 'ts-morph';
import { builderFunction } from '../../src/complex-type';
import { complexMeal, complexMealWithDesert } from '../test-util/data-model';

describe('builder-function', () => {
  it('builderFunction', () => {
    const actual = builderFunction(complexMeal);
    expect(actual).toEqual({
      kind: StructureKind.Function,
      name: 'createComplexMeal',
      isExported: true,
      parameters: [{ name: 'json', type: 'any' }],
      returnType: 'ComplexMeal',
      statements: 'return ComplexMeal.build(json);',
      docs: ['@deprecated since v1.6.0. Use [[ComplexMeal.build]] instead.']
    });
  });

  it('builderFunction with nested complex types', () => {
    const actual = builderFunction(complexMealWithDesert);
    expect(actual).toEqual({
      kind: StructureKind.Function,
      name: 'createComplexMealWithDesert',
      isExported: true,
      parameters: [{ name: 'json', type: 'any' }],
      returnType: 'ComplexMealWithDesert',
      statements: 'return ComplexMealWithDesert.build(json);',
      docs: ['@deprecated since v1.6.0. Use [[ComplexMealWithDesert.build]] instead.']
    });
  });
});
