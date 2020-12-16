import { isArraySchemaObject, isNonArraySchemaObject } from './schema';

describe('isArraySchemaObject', () => {
  it('returns true when detecting an array schema', () => {
    expect(
      isArraySchemaObject({
        type: 'array'
      })
    ).toEqual(true);
  });

  it('returns false when detecting a string schema', () => {
    expect(
      isArraySchemaObject({
        type: 'string'
      })
    ).toEqual(false);
  });

  it('returns false when detecting a reference object', () => {
    expect(
      isArraySchemaObject({
        $ref: '#/components/schemas/typeName'
      })
    ).toEqual(false);
  });
});

describe('isNonArraySchemaObject', () => {
  it('returns true when detecting an string schema', () => {
    expect(
      isNonArraySchemaObject({
        type: 'string'
      })
    ).toEqual(true);
  });

  it('returns false when detecting a array schema', () => {
    expect(
      isNonArraySchemaObject({
        type: 'array'
      })
    ).toEqual(false);
  });

  it('returns false when detecting a reference object', () => {
    expect(
      isNonArraySchemaObject({
        $ref: '#/components/schemas/typeName'
      })
    ).toEqual(false);
  });
});
