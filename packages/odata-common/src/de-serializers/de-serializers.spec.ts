import {
  createValueDeserializer,
  createValueSerializer
} from './de-serializers';
import { defaultDeSerializers } from './default-de-serializers';

describe('createValueDeserializer', () => {
  const deserialize = createValueDeserializer(defaultDeSerializers);

  it('creates function, that deserializes value for known EDM type', () => {
    expect(deserialize('5', 'Edm.Int16')).toEqual(5);
  });

  it('creates function, that returns original value for unknown EDM type', () => {
    expect(deserialize('5', 'Edm.Unknown')).toEqual('5');
  });
});

describe('createValueSerializer', () => {
  const deserialize = createValueSerializer(defaultDeSerializers);

  it('creates function, that serializes value for known EDM type', () => {
    expect(deserialize('5', 'Edm.Int16')).toEqual(5);
  });

  it('creates function, that returns original value for unknown EDM type', () => {
    expect(deserialize('5', 'Edm.Unknown')).toEqual('5');
  });
});
