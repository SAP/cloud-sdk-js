import { unixEOL } from '@sap-cloud-sdk/util';
import { StructureKind } from 'ts-morph';
import {
  complexMeal,
  complexMealWithDesert
} from '../../test/test-util/data-model';
import { builderFunction } from './builder-function';
describe('builder-function', () => {
  it('builderFunction', () => {
    const actual = builderFunction(complexMeal);
    expect(actual).toEqual({
      kind: StructureKind.Function,
      name: 'createComplexMeal',
      isExported: true,
      parameters: [{ name: 'json', type: 'any' }],
      returnType: 'ComplexMealType',
      statements: 'return ComplexMealType.build(json);',
      docs: [
        `${unixEOL}@deprecated Since v1.6.0. Use [[ComplexMealType.build]] instead.`
      ]
    });
  });

  it('builderFunction with nested complex types', () => {
    const actual = builderFunction(complexMealWithDesert);
    expect(actual).toEqual({
      kind: StructureKind.Function,
      name: 'createComplexMealWithDesert',
      isExported: true,
      parameters: [{ name: 'json', type: 'any' }],
      returnType: 'ComplexMealWithDesertType',
      statements: 'return ComplexMealWithDesertType.build(json);',
      docs: [
        `${unixEOL}@deprecated Since v1.6.0. Use [[ComplexMealWithDesertType.build]] instead.`
      ]
    });
  });
});
