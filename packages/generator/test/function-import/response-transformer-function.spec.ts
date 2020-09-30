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
