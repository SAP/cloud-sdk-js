/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { entityTypeInterface } from '../../src/entity';
import {
  breakfastEntity,
  breakfastTime,
  entityName,
  foodService,
  numberOfEggs,
  toBrunch
} from '../test-util/data-model';

describe('entity interface generator', () => {
  it('creates an interface', () => {
    const interfaceDeclaration = entityTypeInterface(
      breakfastEntity,
      foodService
    );
    expect(interfaceDeclaration.name).toBe(`${breakfastEntity.className}Type`);
    expect(interfaceDeclaration.isExported).toBeTruthy();
    const instanceProperties = interfaceDeclaration.properties;
    expect(instanceProperties!.map(prop => [prop.name, prop.type])).toEqual([
      [entityName.instancePropertyName, entityName.jsType],
      [`${numberOfEggs.instancePropertyName}?`, numberOfEggs.jsType],
      [`${breakfastTime.instancePropertyName}`, breakfastTime.jsType],
      [toBrunch.instancePropertyName, `${toBrunch.toEntityClassName}Type`]
    ]);
  });
});
