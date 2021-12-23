import { breakfastEntity, foodService } from '../../test/test-util/data-model';
import { entityImportDeclarations, otherEntityImports } from './imports';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = entityImportDeclarations(breakfastEntity, 'v2');

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
    moduleSpecifier: '@sap-cloud-sdk/odata-v2',
    namedImports: ['Entity', 'DefaultDeSerializers', 'DeSerializers']
  },
  {
    moduleSpecifier: '@sap-cloud-sdk/odata-common/internal',
    namedImports: ['DeserializedType']
  }
];

const expectedOtherEntityImports = [
  {
    namedImports: ['Brunch', 'BrunchType'],
    moduleSpecifier: './Brunch'
  }
];
