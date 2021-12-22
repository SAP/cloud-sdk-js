import { unixEOL } from '@sap-cloud-sdk/util';
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
      name: 'orderBreakfast<DeSerializersT extends DeSerializers = DefaultDeSerializers>',
      parameters: [
        { name: 'parameters', type: 'Params<DeSerializersT>' },
        {
          initializer: 'defaultDeSerializers as any',
          name: 'deSerializers',
          type: 'DeSerializersT'
        }
      ],
      returnType:
        'FunctionImportRequestBuilder<DeSerializersT, Params<DeSerializersT>, string>',
      docs: [
        `order a breakfast ${unixEOL}@param parameters - Object containing all parameters for the function import.${unixEOL}@returns A request builder that allows to overwrite some of the values and execute the resulting request.`
      ],
      isExported: true,
      statements: `const params = {${unixEOL}withHoneyToast: new FunctionImportParameter('WithHoneyToast', 'Edm.Boolean', parameters.withHoneyToast)${unixEOL}};${unixEOL}${unixEOL}${unixEOL}return new FunctionImportRequestBuilder('post', 'some/path/to/food', 'OrderBreakfast', (data) => transformReturnValueForEdmType(data, (val) => edmToTs(val, 'Edm.String', deSerializers)), params, deSerializers);`
    });
  });

  it('should build throwErrorWhenReturnTypeIsUnionType when entities cannot be deserialized', () => {
    const actual = functionImportFunction(entityNotDeserializable, foodService);
    expect(actual).toEqual({
      kind: StructureKind.Function,
      name: 'entityNotDeserializable<DeSerializersT extends DeSerializers = DefaultDeSerializers>',
      parameters: [
        { name: 'parameters', type: 'Params<DeSerializersT>' },
        {
          initializer: 'defaultDeSerializers as any',
          name: 'deSerializers',
          type: 'DeSerializersT'
        }
      ],
      returnType:
        "Omit<FunctionImportRequestBuilder<DeSerializersT, Params<DeSerializersT>, never>, 'execute'>",
      docs: [
        "entityNotDeserializable The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.\n@param parameters - Object containing all parameters for the function import.\n@returns A request builder that allows to overwrite some of the values and execute the resulting request."
      ],
      isExported: true,
      statements:
        "const params = {\n\n};\n\n\nreturn new FunctionImportRequestBuilder('get', 'some/path/to/food', 'entityNotDeserializable', (data) => throwErrorWhenReturnTypeIsUnionType(data, 'entityNotDeserializable'), params, deSerializers);"
    });
  });
});
