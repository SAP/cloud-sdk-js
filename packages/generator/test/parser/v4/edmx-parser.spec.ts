import { readEdmxFile } from '../../../src/edmx-parser/edmx-file-reader';
import { parseComplexTypesBase } from '../../../src/edmx-parser/common/edmx-parser';
import {
  parseActionImport,
  parseActions,
  parseComplexTypes,
  parseEntitySets as parseEntitySetsV4,
  parseEntityType as parseEntityTypeV4,
  parseEnumTypes,
  parseFunctionImports as parseFunctionImportsV4,
  parseFunctions
} from '../../../src/edmx-parser/v4';

describe('edmx-edmx-parser', () => {
  it('v4: parses edmx file to JSON and coerces properties to arrays', () => {
    const metadataEdmx = readEdmxFile(
      '../../test-resources/service-specs/v4/API_TEST_SRV/API_TEST_SRV.edmx'
    );

    expect(parseEntitySetsV4(metadataEdmx.root).length).toBe(11);
    expect(parseEntityTypeV4(metadataEdmx.root).length).toBe(12);
    expect(parseFunctionImportsV4(metadataEdmx.root).length).toBe(8);
    expect(parseFunctions(metadataEdmx.root).length).toBe(8);
    expect(parseActionImport(metadataEdmx.root).length).toBe(3);
    expect(parseActions(metadataEdmx.root).length).toBe(3);
    expect(parseComplexTypesBase(metadataEdmx.root).length).toBe(4);
    expect(parseEnumTypes(metadataEdmx.root).length).toBe(2);

    parseEntitySetsV4(metadataEdmx.root).forEach(e => {
      expect(e.NavigationPropertyBinding).toBeInstanceOf(Array);
    });

    parseEntityTypeV4(metadataEdmx.root).forEach(e => {
      expect(e.Key.PropertyRef).toBeInstanceOf(Array);
      expect(e.Key.PropertyRef.length).toBeGreaterThan(0);
      expect(e.NavigationProperty).toBeInstanceOf(Array);
      expect(e.Property).toBeInstanceOf(Array);
    });

    const baseType = parseEntityTypeV4(metadataEdmx.root).find(
      e => e.Name === 'A_TestEntityBaseType'
    );
    const entityWithBaseType = parseEntityTypeV4(metadataEdmx.root).find(
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
