import { testEntityApi } from '../../test/test-util';
import { defaultDeSerializers } from './default-de-serializers';
import { entityDeserializer } from './entity-deserializer';

describe('with default (de-)serializers', () => {
  const { deserializeEntity } = entityDeserializer(defaultDeSerializers);

  const stringProperty = 'prop';
  const int16Property = 16;
  const booleanProperty = false;

  const expected = testEntityApi
    .entityBuilder()
    .complexTypeProperty({
      stringProperty,
      int16Property,
      booleanProperty,
      complexTypeProperty: {
        stringProperty
      }
    })
    .stringProperty('test')
    .build();

  it('should deserialize with unknown keys', () => {
    const actual = deserializeEntity(
      {
        ComplexTypeProperty: {
          StringProperty: stringProperty,
          Int16Property: int16Property,
          BooleanProperty: booleanProperty,
          ComplexTypeProperty: {
            StringProperty: stringProperty
          },
          UnknownKey: ''
        },
        StringProperty: expected.stringProperty
      },
      testEntityApi
    );

    expect(actual).toEqual(expected);
  });
});
