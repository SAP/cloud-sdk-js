import { unixEOL } from '@sap-cloud-sdk/util';
import { VdmProperty } from '../vdm-types';
import { breakfastEntity } from '../../test/test-util/data-model';
import { requestBuilderClass } from './class';

describe('request builder class', () => {
  it('should generate request builder correctly', () => {
    const requestBuilder = requestBuilderClass(breakfastEntity);
    expect(requestBuilder.name).toBe(
      'BreakfastRequestBuilder<T extends DeSerializers = DefaultDeSerializers>'
    );
    expect(requestBuilder.extends).toBe('RequestBuilder<Breakfast<T>, T>');

    const methods = requestBuilder.methods!.map(method => ({
      name: method.name,
      returnType: method.returnType,
      statements: method.statements,
      parameters: method.parameters
    }));
    const getByKey = {
      name: 'getByKey',
      returnType: 'GetByKeyRequestBuilder<Breakfast<T>, T>',
      statements: `return new GetByKeyRequestBuilder<Breakfast<T>, T>(this.entityApi, {EntityName: entityName,${unixEOL}BreakfastTime: breakfastTime});`,
      parameters: [
        { name: 'entityName', type: "DeserializedType<T, 'Edm.String'>" },
        { name: 'breakfastTime', type: "DeserializedType<T, 'Edm.DateTime'>" }
      ]
    };
    const getAll = {
      name: 'getAll',
      returnType: 'GetAllRequestBuilder<Breakfast<T>, T>',
      statements:
        'return new GetAllRequestBuilder<Breakfast<T>, T>(this.entityApi);',
      parameters: undefined
    };
    const create = {
      name: 'create',
      returnType: 'CreateRequestBuilder<Breakfast<T>, T>',
      statements:
        'return new CreateRequestBuilder<Breakfast<T>, T>(this.entityApi, entity);',
      parameters: [{ name: 'entity', type: 'Breakfast<T>' }]
    };
    const update = {
      name: 'update',
      returnType: 'UpdateRequestBuilder<Breakfast<T>, T>',
      statements:
        'return new UpdateRequestBuilder<Breakfast<T>, T>(this.entityApi, entity);',
      parameters: [{ name: 'entity', type: 'Breakfast<T>' }]
    };
    expect(methods).toEqual([getByKey, getAll, create, update]);
  });

  it('parameters holding reserved keywords should be overwritten', () => {
    const corruptedEntity = breakfastEntity;
    corruptedEntity.deletable = true;
    const accompaniment: VdmProperty = {
      instancePropertyName: 'with',
      staticPropertyName: 'BREAKFAST_TIME',
      propertyNameAsParam: 'pWith',
      jsType: 'string',
      fieldType: 'EdmTypeField',
      originalName: 'With',
      edmType: 'Edm.String',
      description: 'Breakfast accompaniment.',
      nullable: false,
      isCollection: false
    };
    corruptedEntity.properties.push(accompaniment);
    corruptedEntity.keys.push(accompaniment);
    const requestBuilder = requestBuilderClass(corruptedEntity);
    const methods = requestBuilder
      .methods!.filter(
        method => method.name === 'getByKey' || method.name === 'delete'
      )
      .map(method => ({
        name: method.name,
        returnType: method.returnType,
        statements: method.statements,
        parameters: method.parameters
      }));
    const params = [
      { name: 'entityName', type: "DeserializedType<T, 'Edm.String'>" },
      { name: 'breakfastTime', type: "DeserializedType<T, 'Edm.DateTime'>" },
      { name: 'pWith', type: "DeserializedType<T, 'Edm.String'>" }
    ];
    const getByKeyRequestBuilder = {
      name: 'getByKey',
      returnType: 'GetByKeyRequestBuilder<Breakfast<T>, T>',
      statements: `return new GetByKeyRequestBuilder<Breakfast<T>, T>(this.entityApi, {EntityName: entityName,${unixEOL}BreakfastTime: breakfastTime,${unixEOL}With: pWith});`,
      parameters: params
    };

    const deleteParams = [
      { name: 'entityNameOrEntity', type: 'any', hasQuestionToken: false },
      { name: 'breakfastTime', type: 'Time', hasQuestionToken: true },
      { name: 'pWith', type: 'string', hasQuestionToken: true }
    ];
    const deleteRequestBuilder = {
      name: 'delete',
      returnType: 'DeleteRequestBuilder<Breakfast<T>, T>',
      statements: `return new DeleteRequestBuilder<Breakfast<T>, T>(this.entityApi, entityNameOrEntity instanceof Breakfast ? entityNameOrEntity : {EntityName: entityNameOrEntity!,${unixEOL}BreakfastTime: breakfastTime!,${unixEOL}With: pWith!});`,
      parameters: deleteParams
    };
    expect(methods).toEqual([getByKeyRequestBuilder, deleteRequestBuilder]);
  });
});
