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
    expect(responseTransformerFunctionName(returnTypeEntity, 'v2')).toEqual(
      'transformReturnValueForEntityV2'
    );
  });

  it('responseTransformerFunctionName of complex type and list', () => {
    expect(
      responseTransformerFunctionName(returnTypeComplexType, 'v4')
    ).toEqual('transformReturnValueForComplexTypeListV4');
  });

  it('responseTransformerFunctionName of edmType', () => {
    expect(
      responseTransformerFunctionName(orderBreakfast.returnType, 'v2')
    ).toEqual('transformReturnValueForEdmTypeV2');
  });
});
