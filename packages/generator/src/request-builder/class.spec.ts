import { VdmProperty } from '../vdm-types';
import { breakfastEntity } from '../../test/test-util/data-model';
import { requestBuilderClass } from './class';

describe('request builder class', () => {
  it('should generate request builder correctly', () => {
    const requestBuilder = requestBuilderClass(breakfastEntity, 'v2');
    expect(requestBuilder.name).toBe('BreakfastRequestBuilder');
    expect(requestBuilder.extends).toBe('RequestBuilder<Breakfast>');

    const methods = requestBuilder.methods!.map(method => ({
      name: method.name,
      returnType: method.returnType,
      statements: method.statements,
      parameters: method.parameters
    }));
    const getByKey = {
      name: 'getByKey',
      returnType: 'GetByKeyRequestBuilder<Breakfast>',
      statements:
        'return new GetByKeyRequestBuilder(Breakfast, {EntityName: entityName,\nBreakfastTime: breakfastTime});',
      parameters: [
        { name: 'entityName', type: 'string' },
        { name: 'breakfastTime', type: 'Time' }
      ]
    };
    const getAll = {
      name: 'getAll',
      returnType: 'GetAllRequestBuilder<Breakfast>',
      statements: 'return new GetAllRequestBuilder(Breakfast);',
      parameters: undefined
    };
    const create = {
      name: 'create',
      returnType: 'CreateRequestBuilder<Breakfast>',
      statements: 'return new CreateRequestBuilder(Breakfast, entity);',
      parameters: [{ name: 'entity', type: 'Breakfast' }]
    };
    const update = {
      name: 'update',
      returnType: 'UpdateRequestBuilder<Breakfast>',
      statements: 'return new UpdateRequestBuilder(Breakfast, entity);',
      parameters: [{ name: 'entity', type: 'Breakfast' }]
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
      fieldType: 'StringField',
      originalName: 'With',
      edmType: 'Edm.String',
      description: 'Breakfast accompaniment.',
      nullable: false,
      isCollection: false
    };
    corruptedEntity.properties.push(accompaniment);
    corruptedEntity.keys.push(accompaniment);
    const requestBuilder = requestBuilderClass(corruptedEntity, 'v4');
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
      { name: 'entityName', type: 'string' },
      { name: 'breakfastTime', type: 'Time' },
      { name: 'pWith', type: 'string' }
    ];
    const getByKeyRequestBuilder = {
      name: 'getByKey',
      returnType: 'GetByKeyRequestBuilderV4<Breakfast>',
      statements:
        'return new GetByKeyRequestBuilderV4(Breakfast, {EntityName: entityName,\nBreakfastTime: breakfastTime,\nWith: pWith});',
      parameters: params
    };

    const deleteParams = [
      { name: 'entityNameOrEntity', type: 'any', hasQuestionToken: false },
      { name: 'breakfastTime', type: 'Time', hasQuestionToken: true },
      { name: 'pWith', type: 'string', hasQuestionToken: true }
    ];
    const deleteRequestBuilder = {
      name: 'delete',
      returnType: 'DeleteRequestBuilderV4<Breakfast>',
      statements:
        'return new DeleteRequestBuilderV4(Breakfast, entityNameOrEntity instanceof Breakfast ? entityNameOrEntity : {EntityName: entityNameOrEntity!,\nBreakfastTime: breakfastTime!,\nWith: pWith!});',
      parameters: deleteParams
    };
    expect(methods).toEqual([getByKeyRequestBuilder, deleteRequestBuilder]);
  });
});
