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
    expect(classDeclaration.name).toBe(breakfastEntity.className);
    const staticProperties = classDeclaration.properties!.filter(
      prop => prop.isStatic
    );
    expect(staticProperties.map(prop => [prop.name, prop.initializer])).toEqual(
      [
        ['_entityName', `'${breakfastEntity.entitySetName}'`],
        ['_defaultServicePath', `'${foodService.servicePath}'`]
      ]
    );
    const instanceProperties = classDeclaration.properties!.filter(
      prop => !prop.isStatic
    );
    expect(instanceProperties.map(prop => [prop.name, prop.type])).toEqual([
      [`${entityName.instancePropertyName}!`, entityName.jsType],
      [`${numberOfEggs.instancePropertyName}?`, numberOfEggs.jsType],
      [`${breakfastTime.instancePropertyName}!`, breakfastTime.jsType],
      [
        `${toBrunch.instancePropertyName}?`,
        `${toBrunch.toEntityClassName} | null`
      ]
    ]);

    expect(classDeclaration.methods!.map(method => method.name)).toEqual([
      'builder',
      'requestBuilder',
      'customField',
      'toJSON'
    ]);
  });
});
