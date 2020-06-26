/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { stripNamespace, isCollection, parseTypeName } from '../../src/parser';

/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
describe('parser-util', () => {
  it('strips namespace', () => {
    expect(stripNamespace('namespace.name')).toEqual('name');
  });

  it('strips namespace when there is no namespace', () => {
    expect(stripNamespace('name')).toEqual('name');
  });

  it('checks collection for edm types', () => {
    expect(isCollection('Collection(Edm.String)')).toBe(true);
    expect(isCollection('Edm.String')).toBe(false);
  });

  it('checks collection for namespaced types', () => {
    expect(isCollection('Collection(namespace.name)')).toBe(true);
    expect(isCollection('namespace.name')).toBe(false);
  });

  it('checks collection for types without namespace', () => {
    expect(isCollection('Collection(name)')).toBe(true);
    expect(isCollection('name')).toBe(false);
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
