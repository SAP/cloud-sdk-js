/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { responseTransformerFunctionName } from '../../src/function-import';
import { VdmFunctionImportReturnTypeCategory } from '../../src/vdm-types';
import { orderBreakfast } from '../test-util/data-model';

const returnTypeEntity = {
  builderFunction: '',
  returnType: 'Entity',
  isMulti: false,
  returnTypeCategory: VdmFunctionImportReturnTypeCategory.ENTITY
};

const returnTypeComplexType = {
  builderFunction: '',
  returnType: 'ComplexType',
  isMulti: true,
  returnTypeCategory: VdmFunctionImportReturnTypeCategory.COMPLEX_TYPE
};

describe('response-transformer-function', () => {
  it('responseTransformerFunctionName of entity', () => {
    expect(responseTransformerFunctionName(returnTypeEntity)).toEqual('transformReturnValueForEntity');
  });

  it('responseTransformerFunctionName of complex type and list', () => {
    expect(responseTransformerFunctionName(returnTypeComplexType)).toEqual('transformReturnValueForComplexTypeList');
  });

  it('responseTransformerFunctionName of edmType', () => {
    expect(responseTransformerFunctionName(orderBreakfast.returnType)).toEqual('transformReturnValueForEdmType');
  });
});
