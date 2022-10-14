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
        "DeserializedType<T, 'Edm.Decimal'> | null"
      ],
      [
        `${breakfastTime.instancePropertyName}!`,
        "DeserializedType<T, 'Edm.DateTime'>"
      ],
      [`${toBrunch.instancePropertyName}?`, 'Brunch<T> | null']
    ]);

    expect(classDeclaration.methods).toBeDefined();
    expect(classDeclaration.methods?.length).toEqual(2);
    const functions = classDeclaration.methods?.filter(x => x.name === 'myFn');
    expect(functions).toBeDefined();
    expect(functions?.length).toBe(1);
    if (functions) {
      const myFn = functions[0];
      expect(myFn).toBeDefined();
      expect(myFn.parameters?.length).toBe(1);
      if (myFn.parameters) {
        expect(myFn.parameters[0].name).toEqual('FirstParameter');
        if (myFn.statements) {
          expect(
            myFn.statements.toString().indexOf('FirstParameter') > 0
          ).toBeTruthy();
        }
      } else {
        fail(new Error('Expected parameters to be defined'));
      }
    } else {
      fail(new Error('Expected functions to be defined'));
    }

    expect(
      classDeclaration.methods?.filter(x => x.name === 'myAct').length
    ).toEqual(1);
  });
});
