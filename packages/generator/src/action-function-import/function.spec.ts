import { StructureKind } from 'ts-morph';
import {
  entityNotDeserializable,
  foodService,
  orderBreakfast
} from '../../test/test-util/data-model';
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
        'order a breakfast\n\n@param parameters - Object containing all parameters for the function import.\n@returns A request builder that allows to overwrite some of the values and execute the resultng request.'
      ],
      isExported: true,
      statements:
        "const params = {\nwithHoneyToast: new FunctionImportParameter('WithHoneyToast', 'Edm.Boolean', parameters.withHoneyToast)\n}\n\nreturn new FunctionImportRequestBuilderV2('post', 'some/path/to/food', 'OrderBreakfast', (data) => transformReturnValueForEdmTypeV2(data, (val) => edmToTs(val, Edm.String)), params);"
    });
  });

  it('should build throwErrorWhenReturnTypeIsUnionType when entities cannot be deserialized', () => {
    const actual = functionImportFunction(entityNotDeserializable, foodService);
    expect(actual).toEqual({
      kind: StructureKind.Function,
      name: 'entityNotDeserializable',
      parameters: [{ name: 'parameters', type: 'Params' }],
      returnType: 'FunctionImportRequestBuilderV2<Params, string>',
      docs: [
        'entityNotDeserializable\n\n@param parameters - Object containing all parameters for the function import.\n@returns A request builder that allows to overwrite some of the values and execute the resultng request.'
      ],
      isExported: true,
      statements:
        "const params = {\n\n}\n\nreturn new FunctionImportRequestBuilderV2('get', 'some/path/to/food', 'entityNotDeserializable', (data) => throwErrorWhenReturnTypeIsUnionType(data, entityNotDeserializable), params);"
    });
  });
});
