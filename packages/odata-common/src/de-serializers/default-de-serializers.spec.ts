import { DeSerializers } from './de-serializers';
import { wrapDefaultDeSerializers } from './default-de-serializers';

describe('wrapDefaultDeSerializers', () => {
  const wrappedDeSerializers = wrapDefaultDeSerializers({
    'Edm.Any': {
      deserialize: () => 3,
      serialize: () => '3'
    }
  } as unknown as DeSerializers);

  it('wraps serializers with null checks', () => {
    expect(wrappedDeSerializers['Edm.Any'].serialize(null)).toEqual('null');
  });

  it('executes serialization function for non null values', () => {
    expect(wrappedDeSerializers['Edm.Any'].serialize(undefined)).toEqual('3');
  });

  it('wraps deserializers with null checks', () => {
    expect(wrappedDeSerializers['Edm.Any'].deserialize(null)).toEqual(null);
  });

  it('wraps deserializers with undefined checks', () => {
    // This case most likely should never happen
    expect(
      wrappedDeSerializers['Edm.Any'].deserialize(undefined)
    ).toBeUndefined();
  });

  it('wraps deserializers with undefined checks', () => {
    expect(wrappedDeSerializers['Edm.Any'].deserialize('')).toEqual(3);
  });
});
