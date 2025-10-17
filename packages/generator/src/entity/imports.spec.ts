import { breakfastEntity, foodService } from '../../test/test-util/data-model';
import { entityImportDeclarations, otherEntityImports } from './imports';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = entityImportDeclarations(breakfastEntity, foodService, 'v2');

    expect(
      actual.map(imports => ({
        moduleSpecifier: imports.moduleSpecifier,
        namedImports: imports.namedImports,
        isTypeOnly: !!imports.isTypeOnly
      }))
    ).toEqual(expectedEntityImports);
  });

  it('importDeclarations oData v4', () => {
    const actual = entityImportDeclarations(breakfastEntity, foodService, 'v4');

    expect(actual.map(imports => imports.namedImports)).toEqual(
      expectedEntityImportsV4[0].namedImports
    );
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

  describe('ESM support', () => {
    const commonjsOptions = {
      generateESM: false
    } as CreateFileOptions;

    const esmOptions = {
      generateESM: true
    } as CreateFileOptions;

    it('importDeclarations with CommonJS', () => {
      const actual = entityImportDeclarations(breakfastEntity, foodService, 'v2', commonjsOptions);

      expect(
        actual.find(imp => imp.moduleSpecifier === './BreakfastApi')?.moduleSpecifier
      ).toBe('./BreakfastApi');
    });

    it('importDeclarations with ESM', () => {
      const actual = entityImportDeclarations(breakfastEntity, foodService, 'v2', esmOptions);

      const breakfastApiImport = actual.find(imp =>
        Array.isArray(imp.namedImports) && imp.namedImports.includes('BreakfastApi')
      );
      expect(breakfastApiImport?.moduleSpecifier).toBe('./BreakfastApi.js');
    });

    it('otherEntityImports with CommonJS', () => {
      const actual = otherEntityImports(breakfastEntity, foodService, commonjsOptions);

      expect(
        actual.map(imports => imports.moduleSpecifier)
      ).toEqual(['./Brunch']);
    });

    it('otherEntityImports with ESM', () => {
      const actual = otherEntityImports(breakfastEntity, foodService, esmOptions);

      expect(
        actual.map(imports => imports.moduleSpecifier)
      ).toEqual(['./Brunch.js']);
    });

    it('maintains backward compatibility when options is undefined', () => {
      const actual = entityImportDeclarations(breakfastEntity, foodService, 'v2');

      const breakfastApiImport = actual.find(imp =>
        Array.isArray(imp.namedImports) && imp.namedImports.includes('BreakfastApi')
      );
      expect(breakfastApiImport?.moduleSpecifier).toBe('./BreakfastApi');
    });
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
    namedImports: ['BreakfastApi'],
    moduleSpecifier: './BreakfastApi',
    isTypeOnly: true
  }
];

const expectedEntityImportsV4 = [
  {
    moduleSpecifier: '@sap-cloud-sdk/odata-v4',
    namedImports: [
      ['Entity', 'DefaultDeSerializers', 'DeSerializers', 'DeserializedType'],
      ['BreakfastApi'],
      [
        'edmToTs',
        'transformReturnValueForEdmType',
        'DeSerializers',
        'DefaultDeSerializers',
        'defaultDeSerializers',
        'OperationParameter',
        'OperationRequestBuilder'
      ],
      ['foodService']
    ],
    isTypeOnly: false
  },
  {
    namedImports: ['BreakfastApi'],
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
