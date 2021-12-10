import {
  breakfastEntity,
  breakfastTime,
  entityName,
  foodService,
  numberOfEggs,
  toBrunch
} from '../../test/test-util/data-model';
import { entityClass } from './class';

describe('entity class generator', () => {
  it('creates a class', () => {
    const classDeclaration = entityClass(breakfastEntity, foodService);
    expect(classDeclaration.name).toBe(
      `${breakfastEntity.className}<T extends DeSerializers = DefaultDeSerializers>`
    );
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
        "DeserializedType<T, 'Edm.Decimal'>"
      ],
      [
        `${breakfastTime.instancePropertyName}!`,
        "DeserializedType<T, 'Edm.DateTime'>"
      ],
      [`${toBrunch.instancePropertyName}?`, 'Brunch<T> | null']
    ]);

    expect(classDeclaration.methods!.map(method => method.name)).toEqual([
      'toJSON'
    ]);
  });
});
