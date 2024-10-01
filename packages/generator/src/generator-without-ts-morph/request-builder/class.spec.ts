import { breakfastEntity } from '../../../test/test-util/data-model';
import { requestBuilderClass } from './class';
import type { VdmProperty } from '../../vdm-types';

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
      statements: [
        'return new GetByKeyRequestBuilder<Breakfast<T>, T>(this.entityApi, {EntityName: entityName,',
        'BreakfastTime: breakfastTime});'
      ],
      parameters: [
        { name: 'entityName', type: "DeserializedType<T, 'Edm.String'>" },
        { name: 'breakfastTime', type: "DeserializedType<T, 'Edm.DateTime'>" }
      ]
    };
    const getAll = {
      name: 'getAll',
      returnType: 'GetAllRequestBuilder<Breakfast<T>, T>',
      statements: [
        'return new GetAllRequestBuilder<Breakfast<T>, T>(this.entityApi);'
      ],
      parameters: undefined
    };
    const create = {
      name: 'create',
      returnType: 'CreateRequestBuilder<Breakfast<T>, T>',
      statements: [
        'return new CreateRequestBuilder<Breakfast<T>, T>(this.entityApi, entity);'
      ],
      parameters: [{ name: 'entity', type: 'Breakfast<T>' }]
    };
    const update = {
      name: 'update',
      returnType: 'UpdateRequestBuilder<Breakfast<T>, T>',
      statements: [
        'return new UpdateRequestBuilder<Breakfast<T>, T>(this.entityApi, entity);'
      ],
      parameters: [{ name: 'entity', type: 'Breakfast<T>' }]
    };

    [getByKey, getAll, create, update].forEach(method => {
      expect(requestBuilder).toContain(method.name);
      expect(requestBuilder).toContain(method.returnType);
      method.statements.forEach(statement =>
        expect(requestBuilder).toContain(statement)
      );
      method.parameters?.forEach(parameter =>
        expect(requestBuilder).toContain(`${parameter.name}: ${parameter.type}`)
      );
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
      statements: [
        'return new GetByKeyRequestBuilder<Breakfast<T>, T>(this.entityApi, {EntityName: entityName,',
        'BreakfastTime: breakfastTime,',
        'With: pWith});'
      ],
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
      statements: [
        'return new DeleteRequestBuilder<Breakfast<T>, T>(this.entityApi, entityNameOrEntity instanceof Breakfast ? entityNameOrEntity : {EntityName: entityNameOrEntity!,',
        'BreakfastTime: breakfastTime!,',
        'With: pWith!});'
      ],
      parameters: deleteParams
    };

    [getByKeyRequestBuilder, deleteRequestBuilder].forEach(method => {
      expect(requestBuilder).toContain(method.name);
      expect(requestBuilder).toContain(method.returnType);
      method.statements.forEach(statement =>
        expect(requestBuilder).toContain(statement)
      );
      method.parameters.forEach(parameter =>
        expect(requestBuilder).toContain(`${parameter.name}: ${parameter.type}`)
      );
    });
  });
});
