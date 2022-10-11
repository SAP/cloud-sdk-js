import { breakfastEntity, foodService } from '../../test/test-util/data-model';
import { entityImportDeclarations, otherEntityImports } from './imports';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = entityImportDeclarations(breakfastEntity, 'v2');

    expect(
      actual.map(imports => ({
        moduleSpecifier: imports.moduleSpecifier,
        namedImports: imports.namedImports,
        isTypeOnly: !!imports.isTypeOnly,
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
    moduleSpecifier: '@sap-cloud-sdk/odata-v2',
    namedImports: [
      'Entity',
      'DefaultDeSerializers',
      'DeSerializers',
      'DeserializedType'
    ],
    isTypeOnly: false
  },
  {
    namedImports: [
        'BreakfastApi'
    ],
    moduleSpecifier: './BreakfastApi',
    isTypeOnly: true
  }
];

const expectedOtherEntityImports = [
  {
    namedImports: ['Brunch', 'BrunchType'],
    moduleSpecifier: './Brunch'
  }
];
