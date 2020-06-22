/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ODataVersion } from '@sap-cloud-sdk/util';
import { importDeclarations, otherEntityImports } from '../../src/entity';
import { breakfastEntity, foodService } from '../test-util/data-model';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = importDeclarations(breakfastEntity, 'v2');

    expect(
      actual.map(imports => ({
        moduleSpecifier: imports.moduleSpecifier,
        namedImports: imports.namedImports
      }))
    ).toEqual(getExpectedEntityImports());
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

  describe('odata v4', () => {
    it('importDeclarations', () => {
      const actual = importDeclarations(breakfastEntity, 'v4');

      expect(
        actual.map(imports => ({
          moduleSpecifier: imports.moduleSpecifier,
          namedImports: imports.namedImports
        }))
      ).toEqual(getExpectedEntityImports('v4'));
    });
  });
});

function getExpectedEntityImports(version: ODataVersion = 'v2') {
  return [
    {
      moduleSpecifier: './BreakfastRequestBuilder',
      namedImports: ['BreakfastRequestBuilder']
    },
    {
      moduleSpecifier: 'bignumber.js',
      namedImports: ['BigNumber']
    },
    {
      moduleSpecifier:
        version === 'v2'
          ? '@sap-cloud-sdk/core'
          : '@sap-cloud-sdk/core/src/odata/v4',
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
}

const expectedOtherEntityImports = [
  {
    namedImports: ['Brunch', 'BrunchType'],
    moduleSpecifier: './Brunch'
  }
];
