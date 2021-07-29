import { resolve } from 'path';
import { readEdmxFile } from '../edmx-file-reader';
import { parseComplexTypesBase } from '../common/edmx-parser';
import {
  parseActionImport,
  parseActions,
  parseComplexTypes,
  parseEntitySets,
  parseEntityType,
  parseEnumTypes,
  parseFunctionImports,
  parseFunctions
} from '../../../src/edmx-parser/v4';
import { oDataServiceSpecs } from '../../../../../test-resources/odata-service-specs';

describe('edmx-edmx-parser', () => {
  it('v4: parses edmx file to JSON and coerces properties to arrays', () => {
    const metadataEdmx = readEdmxFile(
      resolve(oDataServiceSpecs, 'v4', 'API_TEST_SRV', 'API_TEST_SRV.edmx')
    );

    expect(parseEntitySets(metadataEdmx.root).length).toBe(14);
    expect(parseEntityType(metadataEdmx.root).length).toBe(14);
    expect(parseFunctionImports(metadataEdmx.root).length).toBe(11);
    expect(parseFunctions(metadataEdmx.root).length).toBe(11);
    expect(parseActionImport(metadataEdmx.root).length).toBe(9);
    expect(parseActions(metadataEdmx.root).length).toBe(8);
    expect(parseComplexTypesBase(metadataEdmx.root).length).toBe(4);
    expect(parseEnumTypes(metadataEdmx.root).length).toBe(3);

    parseEntitySets(metadataEdmx.root).forEach(e => {
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
    const complexTypeWithBaseType = parseComplexTypes(metadataEdmx.root).find(
      c => c.BaseType && c.BaseType.endsWith(baseComplexType!.Name)
    );

    baseComplexType?.Property.forEach(p => {
      expect(complexTypeWithBaseType?.Property).toContain(p);
    });

    parseFunctions(metadataEdmx.root).forEach(f => {
      expect(f.Parameter).toBeInstanceOf(Array);
    });

    parseComplexTypes(metadataEdmx.root).forEach(c => {
      expect(c.Property).toBeInstanceOf(Array);
    });
  });
});
