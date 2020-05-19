/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { importDeclarations, otherEntityImports } from '../../src/entity';
import { breakfastEntity, foodService } from '../test-util/data-model';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = importDeclarations(breakfastEntity);

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
      'BigNumberField',
      'CustomField',
      'Entity',
      'EntityBuilderType',
      'Field',
      'OneToOneLink',
      'StringField',
      'Time',
      'TimeField'
    ]
  }
];

const expectedOtherEntityImports = [
  {
    namedImports: ['Brunch', 'BrunchType'],
    moduleSpecifier: './Brunch'
  }
];
