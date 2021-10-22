import { orderBreakfast } from '../../test/test-util/data-model';
import {
  VdmActionFunctionImportReturnType,
  VdmReturnTypeCategory
} from '../vdm-types';
import { responseTransformerFunctionName } from './response-transformer-function';

const returnTypeEntity: VdmActionFunctionImportReturnType = {
  builderFunction: '',
  returnType: 'Entity',
  isCollection: false,
  isNullable: false,
  returnTypeCategory: VdmReturnTypeCategory.ENTITY
};

const returnTypeComplexType: VdmActionFunctionImportReturnType = {
  builderFunction: '',
  returnType: 'ComplexType',
  isCollection: true,
  isNullable: false,
  returnTypeCategory: VdmReturnTypeCategory.COMPLEX_TYPE
};

describe('response-transformer-function', () => {
  it('responseTransformerFunctionName of entity', () => {
    expect(responseTransformerFunctionName(returnTypeEntity)).toEqual(
      'transformReturnValueForEntity'
    );
  });

  it('responseTransformerFunctionName of complex type and list', () => {
    expect(
      responseTransformerFunctionName(returnTypeComplexType)
    ).toEqual('transformReturnValueForComplexTypeList');
  });

  it('responseTransformerFunctionName of edmType', () => {
    expect(
      responseTransformerFunctionName(orderBreakfast.returnType)
    ).toEqual('transformReturnValueForEdmType');
  });
});
