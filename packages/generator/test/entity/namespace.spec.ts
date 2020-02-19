/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { VariableStatementStructure } from 'ts-morph';
import { entityNamespace } from '../../src/entity';
import { breakfastEntity, breakfastTime, brunchEntity, entityName, foodService, numberOfEggs, toBrunch } from '../test-util/data-model';

describe('entity namespace', () => {
  it('creates namespace', () => {
    const namespace = entityNamespace(breakfastEntity, foodService);

    expect(namespace.name).toBe(breakfastEntity.className);
    const variableStatements = (namespace.statements as VariableStatementStructure[]).map(v => v.declarations[0]);
    [
      [entityName.staticPropertyName, `${entityName.fieldType}<${breakfastEntity.className}>`],
      [numberOfEggs.staticPropertyName, `${numberOfEggs.fieldType}<${breakfastEntity.className}>`],
      [breakfastTime.staticPropertyName, `${breakfastTime.fieldType}<${breakfastEntity.className}>`],
      [toBrunch.staticPropertyName, `OneToOneLink<${breakfastEntity.className},${brunchEntity.className}>`]
    ].forEach(nameAndType => {
      expect(variableStatements.map(v => [v.name, v.type])).toContainEqual(nameAndType);
    });
  });
});
