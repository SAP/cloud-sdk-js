export const customStringPropertyValue = 100;

export const customTestDeSerializers = {
  'Edm.String': {
    deserialize: () => customStringPropertyValue,
    serialize: (value: number) => value.toString(),
    serializeToUri: (value: number, serialize) => `'URI(${serialize(value)})'`
  }
};
