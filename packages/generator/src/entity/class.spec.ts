import {
  breakfastEntity,
  breakfastTime,
  entityName,
  foodService,
  numberOfEggs,
  toBrunch
} from '../../test/test-util/data-model';
import { entityClass } from './class';

describe('entity class generator generates a class', () => {
  let classDeclaration;
  beforeAll(() => {
    classDeclaration = entityClass(breakfastEntity, foodService);
  });

  it('has expected name', () => {
    expect(classDeclaration.name).toBe(
      `${breakfastEntity.className}<T extends DeSerializers = DefaultDeSerializers>`
    );
  });

  it('has expected static properties', () => {
    const staticProperties = classDeclaration.properties!.filter(
      prop => prop.isStatic
    );
    expect(staticProperties.map(prop => [prop.name, prop.initializer])).toEqual(
      [
        ['_entityName', `'${breakfastEntity.entitySetName}'`],
        ['_defaultServicePath', `'${foodService.servicePath}'`],
        ['_keys', "['EntityName','BreakfastTime']"]
      ]
    );
  });

  it('has expected instance properties', () => {
    const instanceProperties = classDeclaration.properties!.filter(
      prop => !prop.isStatic
    );
    expect(instanceProperties.map(prop => [prop.name, prop.type])).toEqual([
      [
        `${entityName.instancePropertyName}!`,
        "DeserializedType<T, 'Edm.String'>"
      ],
      [
        `${numberOfEggs.instancePropertyName}?`,
        "DeserializedType<T, 'Edm.Decimal'> | null"
      ],
      [
        `${breakfastTime.instancePropertyName}!`,
        "DeserializedType<T, 'Edm.DateTime'>"
      ],
      [`${toBrunch.instancePropertyName}?`, 'Brunch<T> | null']
    ]);
  });

  it('has expected number of methods', () => {
    expect(classDeclaration.methods?.length).toEqual(2);
  });

  it('has expected parameters for bound function', () => {
    const fn = classDeclaration.methods?.find(({ name }) =>
      name.startsWith('getPrice')
    );

    expect(fn?.parameters?.map(({ name }) => name)).toEqual([
      'parameters',
      'deSerializers'
    ]);

    const parameters = fn?.parameters?.filter(p => p.name === 'parameters');
    expect(parameters.length).toEqual(1);
    expect(parameters[0].type).toEqual('GetPriceParameters<DeSerializersT>');
  });

  it('has expected parameters for bound action', () => {
    const fn = classDeclaration.methods?.find(({ name }) =>
      name.startsWith('payMeal')
    );
    expect(fn?.parameters?.map(({ name }) => name)).toEqual([
      'parameters',
      'deSerializers'
    ]);

    const parameters = fn?.parameters?.filter(p => p.name === 'parameters');
    expect(parameters.length).toEqual(1);
    expect(parameters[0].type).toEqual('PayMealParameters<DeSerializersT>');
  });
});
