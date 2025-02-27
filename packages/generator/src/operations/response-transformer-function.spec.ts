import { orderBreakfast } from '../../test/test-util/data-model';
import { responseTransformerFunctionName } from './response-transformer-function';
import type { VdmOperationReturnType } from '../vdm-types';

const returnTypeEntity: VdmOperationReturnType = {
  builderFunction: '',
  returnType: 'Entity',
  isCollection: false,
  isNullable: false,
  returnTypeCategory: 'entity'
};

const returnTypeComplexType: VdmOperationReturnType = {
  builderFunction: '',
  returnType: 'ComplexType',
  isCollection: true,
  isNullable: false,
  returnTypeCategory: 'complex-type'
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
