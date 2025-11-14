import { breakfastEntity, foodService } from '../../test/test-util/data-model';
import { entityImportDeclarations, otherEntityImports } from './imports';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

const esmOptions = {
  generateESM: true
} as CreateFileOptions;

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

  it('adds .js in import declarations when ESM flag is true', () => {
    const actual = entityImportDeclarations(
      breakfastEntity,
      foodService,
      'v2',
      esmOptions
    );

    const breakfastApiImport = actual.find(
      imp =>
        Array.isArray(imp.namedImports) &&
        imp.namedImports.includes('BreakfastApi')
    );
    expect(breakfastApiImport?.moduleSpecifier).toBe('./BreakfastApi.js');
  });

  it('adds .js in other entity imports when ESM flag is true', () => {
    const actual = otherEntityImports(breakfastEntity, foodService, esmOptions);

    expect(actual.map(imports => imports.moduleSpecifier)).toEqual([
      './Brunch.js'
    ]);
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
