import { breakfastEntity, foodService } from '../../test/test-util/data-model';
import { importDeclarations, otherEntityImports } from './imports';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = importDeclarations(breakfastEntity, 'v2');

    expect(
      actual.map(imports => ({
        moduleSpecifier: imports.moduleSpecifier,
        namedImports: imports.namedImports
      }))
    ).toEqual(expectedEntityImports);
  });

  it('otherEntityImports', () => {
    const actual = otherEntityImports(breakfastEntity, foodService);
    expect(
      actual.map(imports => ({
        moduleSpecifier: imports.moduleSpecifier,
        namedImports: imports.namedImports
      }))
    ).toEqual(expectedOtherEntityImports);
  });
});

const expectedEntityImports = [
  {
    moduleSpecifier: './BreakfastRequestBuilder',
    namedImports: ['BreakfastRequestBuilder']
  },
  {
    moduleSpecifier: 'bignumber.js',
    namedImports: ['BigNumber']
  },
  {
    moduleSpecifier: '@sap-cloud-sdk/core',
    namedImports: [
      'AllFields',
      'Constructable',
      'CustomFieldV2',
      'EdmTypeField',
      'EntityBuilderType',
      'EntityV2',
      'Field',
      'FieldBuilder',
      'OneToOneLink',
      'OrderableEdmTypeField',
      'Time'
    ]
  }
];

const expectedOtherEntityImports = [
  {
    namedImports: ['Brunch', 'BrunchType'],
    moduleSpecifier: './Brunch'
  }
];
