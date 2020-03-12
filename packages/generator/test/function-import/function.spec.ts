import { StructureKind } from 'ts-morph';
import { functionImportFunction } from '../../src/function-import';
import { foodService, orderBreakfast } from '../test-util/data-model';

describe('function', () => {
  it('functionImportFunction', () => {
    const actual = functionImportFunction(orderBreakfast, foodService);
    expect(actual).toEqual({
      kind: StructureKind.Function,
      name: 'orderBreakfast',
      parameters: [{ name: 'parameters', type: 'Params' }],
      returnType: 'FunctionImportRequestBuilder<Params, string>',
      docs: [
        'order a breakfast\n\n@param parameters - Object containing all parameters for the function import.\n@returns A request builder that allows to overwrite some of the values and execute the resultng request.'
      ],
      isExported: true,
      statements:
        "const params = {\nwithHoneyToast: new FunctionImportParameter('WithHoneyToast', 'Edm.Boolean', parameters.withHoneyToast)\n}\n\nreturn new FunctionImportRequestBuilder('post', 'some/path/to/food', 'OrderBreakfast', (data) => transformReturnValueForEdmType(data, (val) => edmToTs(val, Edm.String)), params);"
    });
  });
});
