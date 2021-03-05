/**
 * @deprecated Since v1.25.0. use [[deserializeComplexType]] instead.
 * @param json A raw json object to deserialize a complex type from.
 * @param converters A list of rules on how to convert json to the respective type in JavaScript or TypeScript.
 * @returns A deserialized complex type representation.
 */
export function createComplexType<ComplexT>(
  json: any,
  converters: { [converter: string]: CallableFunction }
): ComplexT {
  return Object.entries(json).reduce(
    (complexTypeInstance, [jsonKey, jsonValue]) => ({
      ...complexTypeInstance,
      ...converters[jsonKey](jsonValue)
    }),
    {}
  );
}
