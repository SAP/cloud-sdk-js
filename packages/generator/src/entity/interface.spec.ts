import { entityTypeInterface } from '../entity';
import {
  breakfastEntity,
  breakfastTime,
  entityName,
  foodService,
  numberOfEggs,
  toBrunch
} from '../../test/test-util/data-model';

describe('entity interface generator', () => {
  it('creates an interface', () => {
    const interfaceDeclaration = entityTypeInterface(
      breakfastEntity,
      foodService
    );
    expect(interfaceDeclaration.name).toBe(
      `${breakfastEntity.className}Type<T extends DeSerializers = DefaultDeSerializers>`
    );
    expect(interfaceDeclaration.isExported).toBeTruthy();
    const instanceProperties = interfaceDeclaration.properties;
    expect(instanceProperties!.map(prop => [prop.name, prop.type])).toEqual([
      [entityName.instancePropertyName, "DeserializedType<T, 'Edm.String'>"],
      [
        `${numberOfEggs.instancePropertyName}?`,
        "DeserializedType<T, 'Edm.Decimal'> | null"
      ],
      [
        `${breakfastTime.instancePropertyName}`,
        "DeserializedType<T, 'Edm.DateTime'>"
      ],
      [`${toBrunch.instancePropertyName}?`, 'BrunchType<T> | null']
    ]);
  });
});
