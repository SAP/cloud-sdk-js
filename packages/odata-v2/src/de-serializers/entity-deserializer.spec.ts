import { testEntityApi } from '../../test/test-util';
import { defaultDeSerializers } from './default-de-serializers';
import { entityDeserializer } from './entity-deserializer';

describe('with default (de-)serializers', () => {
  const { deserializeEntity } = entityDeserializer(defaultDeSerializers);

  const stringProperty = 'prop';

  it('should deserialize 1', () => {
    const expected = testEntityApi
      .entityBuilder()
      .complexTypeProperty({
        stringProperty
      })
      .stringProperty('test')
      .build();

    const actual = deserializeEntity(
      {
        ComplexTypeProperty: {
          StringProperty: stringProperty
        },
        StringProperty: expected.stringProperty
      },
      testEntityApi
    );

    expect(actual).toEqual(expected);
  });

  it('should deserialize 2', () => {
    const expected = testEntityApi
      .entityBuilder()
      .complexTypeProperty({
        stringProperty
      })
      .stringProperty('test')
      .build();

    const actual = deserializeEntity(
      {
        ComplexTypeProperty: {
          StringProperty: stringProperty
        },
        StringProperty: expected.stringProperty
      },
      testEntityApi
    );

    expect(actual).toEqual(expected);
  });
});
