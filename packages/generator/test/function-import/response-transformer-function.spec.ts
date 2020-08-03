/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { VdmReturnTypeCategory } from '../../src/vdm-types';
import { orderBreakfast } from '../test-util/data-model';
import { responseTransformerFunctionName } from '../../src/action-function-import/response-transformer-function';

const returnTypeEntity = {
  builderFunction: '',
  returnType: 'Entity',
  isCollection: false,
  returnTypeCategory: VdmReturnTypeCategory.ENTITY
};

const returnTypeComplexType = {
  builderFunction: '',
  returnType: 'ComplexType',
  isCollection: true,
  returnTypeCategory: VdmReturnTypeCategory.COMPLEX_TYPE
};

describe('response-transformer-function', () => {
  it('responseTransformerFunctionName of entity', () => {
    expect(responseTransformerFunctionName(returnTypeEntity)).toEqual(
      'transformReturnValueForEntity'
    );
  });

  it('responseTransformerFunctionName of complex type and list', () => {
    expect(responseTransformerFunctionName(returnTypeComplexType)).toEqual(
      'transformReturnValueForComplexTypeList'
    );
  });

  it('responseTransformerFunctionName of edmType', () => {
    expect(responseTransformerFunctionName(orderBreakfast.returnType)).toEqual(
      'transformReturnValueForEdmType'
    );
  });
});
