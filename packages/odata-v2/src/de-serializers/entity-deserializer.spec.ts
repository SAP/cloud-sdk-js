import { testEntityApi, testEntityMultiLinkApi } from '../../test/test-util';
import { defaultDeSerializers } from './default-de-serializers';
import { entityDeserializer } from './entity-deserializer';

describe('with default (de-)serializers', () => {
  const { deserializeEntity } = entityDeserializer(defaultDeSerializers);
  it('should build an entity with properties', () => {
    const prop = 'test';
    const testEntity = testEntityApi
      .entityBuilder()
      .stringProperty(prop)
      .build();

    const response = { StringProperty: prop };

    expect(deserializeEntity(response, testEntityApi)).toEqual(testEntity);
  });

  it('should build an entity with multi link from response with results object (S/4)', () => {
    const prop = 'test';
    const multiLinkEntity = testEntityMultiLinkApi
      .entityBuilder()
      .stringProperty(prop)
      .build();
    const testEntity = testEntityApi
      .entityBuilder()
      .toMultiLink([multiLinkEntity])
      .build();

    const response = {
      to_MultiLink: {
        results: [{ StringProperty: prop }]
      }
    };
    expect(deserializeEntity(response, testEntityApi)).toEqual(testEntity);
  });
});
