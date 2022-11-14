import { resolve } from 'path';
import { oDataServiceSpecs } from '../../../../../test-resources/odata-service-specs';
import { parseComplexTypesBase } from '../common';
import { readEdmxFile } from '../edmx-file-reader';
import {
  parseComplexTypesV4,
  parseEntitySetsV4,
  parseEntityType,
  parseEnumTypes,
  parseOperationImports,
  parseOperations
} from '../v4';

describe('edmx-edmx-parser', () => {
  it('parses IsBound  with default false', () => {
    const metadataEdmx = readEdmxFile(
      resolve(oDataServiceSpecs, 'v4', 'API_TEST_SRV', 'API_TEST_SRV.edmx')
    );
    expect(parseOperations(metadataEdmx.root, 'function')[0].IsBound).toEqual(
      'false'
    );
  });

  it('parses IsBound with true and false values', () => {
    const metadataEdmx = readEdmxFile(
      resolve(
        oDataServiceSpecs,
        '../odata-service-specs-e2e',
        'v4',
        'API_TEST_SRV',
        'API-TEST_SRV.edmx'
      )
    );

    const isBoundValues: string[] = parseOperations(
      metadataEdmx.root,
      'function'
    ).map(operation => operation.IsBound);
    expect(isBoundValues.length).not.toEqual(0);

    const isBoundValuesWithTrueAndFalseRemoved = isBoundValues
      .filter(isBound => isBound === 'true')
      .filter(isBound => isBound === 'false');
    expect(isBoundValuesWithTrueAndFalseRemoved.length).toEqual(0);
  });

  it('v4: parses EDMX file to JSON and coerces properties to arrays', () => {
    const metadataEdmx = readEdmxFile(
      resolve(oDataServiceSpecs, 'v4', 'API_TEST_SRV', 'API_TEST_SRV.edmx')
    );

    expect(parseEntitySetsV4(metadataEdmx.root).length).toBe(14);
    expect(parseEntityType(metadataEdmx.root).length).toBe(14);
    expect(parseOperationImports(metadataEdmx.root, 'function').length).toBe(
      13
    );
    expect(parseOperations(metadataEdmx.root, 'function').length).toBe(13);
    expect(parseOperationImports(metadataEdmx.root, 'action').length).toBe(10);
    expect(parseOperations(metadataEdmx.root, 'action').length).toBe(9);
    expect(parseComplexTypesBase(metadataEdmx.root).length).toBe(4);
    expect(parseEnumTypes(metadataEdmx.root).length).toBe(3);

    parseEntitySetsV4(metadataEdmx.root).forEach(e => {
      expect(e.NavigationPropertyBinding).toBeInstanceOf(Array);
    });

    parseEntityType(metadataEdmx.root).forEach(e => {
      expect(e.Key.PropertyRef).toBeInstanceOf(Array);
      expect(e.Key.PropertyRef.length).toBeGreaterThan(0);
      expect(e.NavigationProperty).toBeInstanceOf(Array);
      expect(e.Property).toBeInstanceOf(Array);
    });

    const baseType = parseEntityType(metadataEdmx.root).find(
      e => e.Name === 'A_TestEntityBaseType'
    );
    const entityWithBaseType = parseEntityType(metadataEdmx.root).find(
      e => e.BaseType && e.BaseType.endsWith(baseType!.Name)
    );
    baseType?.Property.forEach(p => {
      expect(entityWithBaseType?.Property).toContain(p);
    });
    baseType?.NavigationProperty.forEach(n => {
      expect(entityWithBaseType?.NavigationProperty).toContain(n);
    });

    const baseComplexType = parseComplexTypesBase(metadataEdmx.root).find(
      c => (c.Name = 'A_TestComplexBaseType')
    );
    const complexTypeWithBaseType = parseComplexTypesV4(metadataEdmx.root).find(
      c => c.BaseType && c.BaseType.endsWith(baseComplexType!.Name)
    );

    baseComplexType?.Property.forEach(p => {
      expect(complexTypeWithBaseType?.Property).toContain(p);
    });

    parseOperations(metadataEdmx.root, 'function').forEach(f => {
      expect(f.Parameter).toBeInstanceOf(Array);
    });

    parseOperations(metadataEdmx.root, 'action').forEach(f => {
      expect(f.Parameter).toBeInstanceOf(Array);
    });

    parseComplexTypesV4(metadataEdmx.root).forEach(c => {
      expect(c.Property).toBeInstanceOf(Array);
    });
  });
});
