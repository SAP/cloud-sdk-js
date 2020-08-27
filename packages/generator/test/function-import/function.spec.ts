/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { StructureKind } from 'ts-morph';
import { foodService, orderBreakfast } from '../test-util/data-model';
import { functionImportFunction } from '../../src/action-function-import/function';

describe('function', () => {
  it('functionImportFunction', () => {
    const actual = functionImportFunction(orderBreakfast, foodService);
    expect(actual).toEqual({
      kind: StructureKind.Function,
      name: 'orderBreakfast',
      parameters: [{ name: 'parameters', type: 'Params' }],
      returnType: 'FunctionImportRequestBuilderV2<Params, string>',
      docs: [
        'order a breakfast\n\n@param parameters - Object containing all parameters for the function import.\n@returns A request builder that allows to overwrite some of the values and execute the resultng request.'
      ],
      isExported: true,
      statements:
        "const params = {\nwithHoneyToast: new FunctionImportParameter('WithHoneyToast', 'Edm.Boolean', parameters.withHoneyToast)\n}\n\nreturn new FunctionImportRequestBuilderV2('post', 'some/path/to/food', 'OrderBreakfast', (data) => transformReturnValueForEdmTypeV2(data, (val) => edmToTs(val, Edm.String)), params);"
    });
  });
});
