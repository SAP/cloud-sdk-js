import { EOL } from 'os';
import { StructureKind } from 'ts-morph';
import { foodService, orderBreakfast } from '../../test/test-util/data-model';
import { functionImportFunction } from './function';

describe('function', () => {
  it('functionImportFunction', () => {
    const actual = functionImportFunction(orderBreakfast, foodService);
    expect(actual).toEqual({
      kind: StructureKind.Function,
      name: 'orderBreakfast',
      parameters: [{ name: 'parameters', type: 'Params' }],
      returnType: 'FunctionImportRequestBuilderV2<Params, string>',
      docs: [
        `order a breakfast${EOL}${EOL}@param parameters - Object containing all parameters for the function import.${EOL}@returns A request builder that allows to overwrite some of the values and execute the resultng request.`
      ],
      isExported: true,
      statements: `const params = {${EOL}withHoneyToast: new FunctionImportParameter('WithHoneyToast', 'Edm.Boolean', parameters.withHoneyToast)${EOL}}${EOL}${EOL}return new FunctionImportRequestBuilderV2('post', 'some/path/to/food', 'OrderBreakfast', (data) => transformReturnValueForEdmTypeV2(data, (val) => edmToTs(val, Edm.String)), params);`
    });
  });
});
