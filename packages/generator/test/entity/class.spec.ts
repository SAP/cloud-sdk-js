/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { entityClass } from '../../src/entity';
import {
  breakfastEntity,
  breakfastTime,
  entityName,
  foodService,
  numberOfEggs,
  toBrunch
} from '../test-util/data-model';
import { applySuffixOnConflictUnderscore } from '../../src/name-formatting-strategies';
import { getInterfaceNames, ServiceNameFormatter } from '../../src/service-name-formatter';

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
        ['_serviceName', `'${foodService.namespace}'`],
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
      [`${toBrunch.instancePropertyName}!`, toBrunch.toEntityClassName]
    ]);

    expect(classDeclaration.methods!.map(method => method.name)).toEqual([
      'builder',
      'requestBuilder',
      'customField',
      'toJSON'
    ]);
  });


});
