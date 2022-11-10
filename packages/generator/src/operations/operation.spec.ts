import { unixEOL } from '@sap-cloud-sdk/util';
import { StructureKind } from 'ts-morph';
import {
  entityNotDeserializable,
  foodService,
  orderBreakfast
} from '../../test/test-util/data-model';
import { operationFunction } from './operation';

describe('function', () => {
  it('creates statement for bound operations', () => {
    const actual = operationFunction(
      {
        ...orderBreakfast,
        isBound: true,
        entityClassName: 'BreakfastEntity'
      },
      { ...foodService, oDataVersion: 'v4' }
    );
    expect(actual).toEqual({
      kind: StructureKind.Function,
      name: 'orderBreakfast',
      parameters: [
        { name: 'parameters', type: 'Params<T>' },
        {
          initializer: undefined,
          name: 'deSerializers?',
          type: 'T'
        }
      ],
      returnType:
        'BoundFunctionImportRequestBuilder<BreakfastEntity<T>, T, Params<T>, string>',
      docs: [
        `order a breakfast ${unixEOL}@param parameters - Object containing all parameters for the function.${unixEOL}@returns A request builder that allows to overwrite some of the values and execute the resulting request.`
      ],
      isExported: true,
      statements: `const params = {${unixEOL}withHoneyToast: new FunctionImportParameter('WithHoneyToast', 'Edm.Boolean', parameters.withHoneyToast)${unixEOL}};${unixEOL}${unixEOL}return new BoundFunctionImportRequestBuilder(this._entityApi, this, 'OrderBreakfast', (data) => transformReturnValueForEdmType(data, (val) => edmToTs(val, 'Edm.String', deSerializers)), params, deSerializers || defaultDeSerializers);`
    });
  });

  it('functionImportFunction', () => {
    const actual = operationFunction(orderBreakfast, foodService);
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
        `order a breakfast ${unixEOL}@param parameters - Object containing all parameters for the function.${unixEOL}@returns A request builder that allows to overwrite some of the values and execute the resulting request.`
      ],
      isExported: true,
      statements: `const params = {${unixEOL}withHoneyToast: new FunctionImportParameter('WithHoneyToast', 'Edm.Boolean', parameters.withHoneyToast)${unixEOL}};${unixEOL}${unixEOL}return new FunctionImportRequestBuilder('post', 'some/path/to/food', 'OrderBreakfast', (data) => transformReturnValueForEdmType(data, (val) => edmToTs(val, 'Edm.String', deSerializers)), params, deSerializers);`
    });
  });

  it('should build throwErrorWhenReturnTypeIsUnionType when entities cannot be deserialized', () => {
    const actual = operationFunction(entityNotDeserializable, foodService);
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
        "entityNotDeserializable The 'execute' method does not exist when using this function import. Please use the 'executeRaw' for getting the raw response.\n@param parameters - Object containing all parameters for the function.\n@returns A request builder that allows to overwrite some of the values and execute the resulting request."
      ],
      isExported: true,
      statements:
        "const params = {\n\n};\n\nreturn new FunctionImportRequestBuilder('get', 'some/path/to/food', 'entityNotDeserializable', (data) => throwErrorWhenReturnTypeIsUnionType(data, 'entityNotDeserializable'), params, deSerializers);"
    });
  });
});
