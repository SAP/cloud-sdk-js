import {
  isCollectionType,
  parseTypeName,
  stripNamespace
} from './edmx-to-vdm-util';

describe('edmx-parser-util', () => {
  it('strips namespace', () => {
    expect(stripNamespace('namespace.name')).toEqual('name');
  });

  it('strips namespace when there is no namespace', () => {
    expect(stripNamespace('name')).toEqual('name');
  });

  it('checks collection for EDM types', () => {
    expect(isCollectionType('Collection(Edm.String)')).toBe(true);
    expect(isCollectionType('Edm.String')).toBe(false);
  });

  it('checks collection for namespaced types', () => {
    expect(isCollectionType('Collection(namespace.name)')).toBe(true);
    expect(isCollectionType('namespace.name')).toBe(false);
  });

  it('checks collection for types without namespace', () => {
    expect(isCollectionType('Collection(name)')).toBe(true);
    expect(isCollectionType('name')).toBe(false);
  });

  it('parses type name for types with namespace', () => {
    expect(parseTypeName('namespace.name')).toEqual('namespace.name');
  });

  it('parses type name for collection types with namespace', () => {
    expect(parseTypeName('Collection(namespace.name)')).toEqual(
      'namespace.name'
    );
  });

  it('parses type name for types without namespace', () => {
    expect(parseTypeName('name')).toEqual('name');
  });

  it('parses type name for collection types without namespace', () => {
    expect(parseTypeName('Collection(name)')).toEqual('name');
  });
});
