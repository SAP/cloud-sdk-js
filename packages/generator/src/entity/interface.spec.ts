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
      `${breakfastEntity.className}Type<DeSerializersT extends DeSerializers = DefaultDeSerializers>`
    );
    expect(interfaceDeclaration.isExported).toBeTruthy();
    const instanceProperties = interfaceDeclaration.properties;
    expect(instanceProperties!.map(prop => [prop.name, prop.type])).toEqual([
      [
        entityName.instancePropertyName,
        "DeserializedType<DeSerializersT, 'Edm.String'>"
      ],
      [
        `${numberOfEggs.instancePropertyName}?`,
        "DeserializedType<DeSerializersT, 'Edm.Decimal'> | null"
      ],
      [
        `${breakfastTime.instancePropertyName}`,
        "DeserializedType<DeSerializersT, 'Edm.DateTime'>"
      ],
      [`${toBrunch.instancePropertyName}?`, 'BrunchType<DeSerializersT> | null']
    ]);
  });
});
