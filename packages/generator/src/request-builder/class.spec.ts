import { unixEOL } from '@sap-cloud-sdk/util';
import { breakfastEntity, brunchEntity } from '../../test/test-util/data-model';
import { VdmProperty } from '../vdm-types';
import { requestBuilderClass } from './class';

describe('request builder class', () => {
  it('should generate request builder correctly', () => {
    const requestBuilder = requestBuilderClass(breakfastEntity);
    expect(requestBuilder).toContain(
      'BreakfastRequestBuilder<T extends DeSerializers = DefaultDeSerializers>'
    );
    expect(requestBuilder).toContain('RequestBuilder<Breakfast<T>, T>');

    const getByKey = {
      name: 'getByKey',
      returnType: 'GetByKeyRequestBuilder<Breakfast<T>, T>',
      statements: `return new GetByKeyRequestBuilder<Breakfast<T>, T>(this.entityApi, {EntityName: entityName,${unixEOL}            BreakfastTime: breakfastTime});`,
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

    [getByKey, getAll, create, update].forEach(method => {
      expect(requestBuilder).toContain(method.name);
      expect(requestBuilder).toContain(method.returnType);
      expect(requestBuilder).toContain(method.statements);
    });
  });

  xit('should generate request builder correctly with delete', () => {
    const requestBuilder = requestBuilderClass(brunchEntity);
    expect(requestBuilder).toContain(
      'BrunchRequestBuilder<T extends DeSerializers = DefaultDeSerializers>'
    );
    expect(requestBuilder).toContain('RequestBuilder<Brunch<T>, T>');

    const getByKey = {
      name: 'getByKey',
      returnType: 'GetByKeyRequestBuilder<Brunch<T>, T>',
      statements: 'return new GetByKeyRequestBuilder<Brunch<T>, T>(this.entityApi, {EntityName: entityName});',
      parameters: [
        { name: 'entityName', type: "DeserializedType<T, 'Edm.String'>" },
        { name: 'BrunchTime', type: "DeserializedType<T, 'Edm.DateTime'>" }
      ]
    };
    const getAll = {
      name: 'getAll',
      returnType: 'GetAllRequestBuilder<Brunch<T>, T>',
      statements:
        'return new GetAllRequestBuilder<Brunch<T>, T>(this.entityApi);',
      parameters: undefined
    };
    const create = {
      name: 'create',
      returnType: 'CreateRequestBuilder<Brunch<T>, T>',
      statements:
        'return new CreateRequestBuilder<Brunch<T>, T>(this.entityApi, entity);',
      parameters: [{ name: 'entity', type: 'Brunch<T>' }]
    };
    const update = {
      name: 'update',
      returnType: 'UpdateRequestBuilder<Brunch<T>, T>',
      statements:
        'return new UpdateRequestBuilder<Brunch<T>, T>(this.entityApi, entity);',
      parameters: [{ name: 'entity', type: 'Brunch<T>' }]
    };
    const deleteParams = [
      { name: 'entityNameOrEntity', type: 'any', hasQuestionToken: false },
      { name: 'brunchTime', type: 'Time', hasQuestionToken: true },
      { name: 'pWith', type: 'string', hasQuestionToken: true }
    ];
    const deleteRequestBuilder = {
      name: 'delete',
      returnType: 'DeleteRequestBuilder<Brunch<T>, T>',
      statements: `return new DeleteRequestBuilder<Brunch<T>, T>(this.entityApi, entityNameOrEntity instanceof Brunch ? entityNameOrEntity : {EntityName: entityNameOrEntity!,${unixEOL}        BrunchTime: brunchTime!,${unixEOL}        With: pWith!});`,
      parameters: deleteParams
    };

    [getByKey, getAll, create, update, deleteRequestBuilder].forEach(method => {
      expect(requestBuilder).toContain(method.name);
      expect(requestBuilder).toContain(method.returnType);
      expect(requestBuilder).toContain(method.statements);
    });
  });

  it('parameters holding reserved keywords should be overwritten', () => {
    const corruptedEntity = breakfastEntity;
    corruptedEntity.deletable = true;
    const accompaniment: VdmProperty = {
      instancePropertyName: 'with',
      staticPropertyName: 'BREAKFAST_TIME',
      propertyNameAsParam: 'pWith',
      jsType: 'string',
      fieldType: 'OrderableEdmTypeField',
      originalName: 'With',
      edmType: 'Edm.String',
      description: 'Breakfast accompaniment.',
      nullable: false,
      isCollection: false
    };
    corruptedEntity.properties.push(accompaniment);
    corruptedEntity.keys.push(accompaniment);
    const requestBuilder = requestBuilderClass(corruptedEntity);

    const params = [
      { name: 'entityName', type: "DeserializedType<T, 'Edm.String'>" },
      { name: 'breakfastTime', type: "DeserializedType<T, 'Edm.DateTime'>" },
      { name: 'pWith', type: "DeserializedType<T, 'Edm.String'>" }
    ];
    const getByKeyRequestBuilder = {
      name: 'getByKey',
      returnType: 'GetByKeyRequestBuilder<Breakfast<T>, T>',
      statements: `return new GetByKeyRequestBuilder<Breakfast<T>, T>(this.entityApi, {EntityName: entityName,${unixEOL}            BreakfastTime: breakfastTime,${unixEOL}            With: pWith});`,
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
      statements: `return new DeleteRequestBuilder<Breakfast<T>, T>(this.entityApi, entityNameOrEntity instanceof Breakfast ? entityNameOrEntity : {EntityName: entityNameOrEntity!,${unixEOL}        BreakfastTime: breakfastTime!,${unixEOL}        With: pWith!});`,
      parameters: deleteParams
    };

    [getByKeyRequestBuilder, deleteRequestBuilder].forEach(method => {
      expect(requestBuilder).toContain(method.name);
      expect(requestBuilder).toContain(method.returnType);
      expect(requestBuilder).toContain(method.statements);
    });
  });
});
