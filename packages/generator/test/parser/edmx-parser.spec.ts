/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { readEdmxFile } from '../../src/parser/util/edmx-file-reader';
import { parseComplexTypesBase } from '../../src/parser/common/edmx-parser';
import {
  parseAssociation,
  parseAssociationSets,
  parseEntitySets as parseEntitySetsV2,
  parseEntityTypes as parseEntityTypesV2,
  parseFunctionImports as parseFunctionImportsV2
} from '../../src/parser/v2/edmx-parser';
import {
  parseComplexTypes,
  parseEntitySets as parseEntitySetsV4,
  parseEntityType as parseEntityTypeV4,
  parseEnumTypes,
  parseFunctionImports as parseFunctionImportsV4,
  parseFunctions
} from '../../src/parser/v4/edmx-parser';

describe('edmx-parser', () => {
  it('v2: parses edmx file to JSON and coerces properties to arrays', () => {
    const metadataEdmx = readEdmxFile(
      '../../test-resources/service-specs/v2/API_TEST_SRV/API_TEST_SRV.edmx'
    );

    expect(parseEntitySetsV2(metadataEdmx.root).length).toBe(10);
    expect(parseEntityTypesV2(metadataEdmx.root).length).toBe(10);
    expect(parseFunctionImportsV2(metadataEdmx.root).length).toBe(12);
    expect(parseComplexTypesBase(metadataEdmx.root).length).toBe(3);
    expect(parseAssociationSets(metadataEdmx.root).length).toBe(8);
    expect(parseAssociation(metadataEdmx.root).length).toBe(8);

    parseEntityTypesV2(metadataEdmx.root).forEach(e => {
      expect(e.Key.PropertyRef).toBeInstanceOf(Array);
      expect(e.NavigationProperty).toBeInstanceOf(Array);
      expect(e.Property).toBeInstanceOf(Array);
    });

    parseAssociationSets(metadataEdmx.root).forEach(a => {
      expect(a.End.length).toBe(2);
    });

    parseAssociation(metadataEdmx.root).forEach(a => {
      expect(a.End.length).toBe(2);
    });

    parseFunctionImportsV2(metadataEdmx.root).forEach(f => {
      expect(f.Parameter).toBeInstanceOf(Array);
    });

    parseComplexTypesBase(metadataEdmx.root).forEach(c => {
      expect(c.Property).toBeInstanceOf(Array);
    });
  });

  it('v4: parses edmx file to JSON and coerces properties to arrays', () => {
    const metadataEdmx = readEdmxFile(
      '../../test-resources/service-specs/v4/API_TEST_SRV/API_TEST_SRV.edmx'
    );

    expect(parseEntitySetsV4(metadataEdmx.root).length).toBe(10);
    expect(parseEntityTypeV4(metadataEdmx.root).length).toBe(11);
    expect(parseFunctionImportsV4(metadataEdmx.root).length).toBe(8);
    expect(parseFunctions(metadataEdmx.root).length).toBe(8);
    expect(parseComplexTypesBase(metadataEdmx.root).length).toBe(4);
    expect(parseEnumTypes(metadataEdmx.root).length).toBe(1);

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

  it('does not fail for multiple schema entries in the edmx file', () => {
    expect(() =>
      readEdmxFile(
        '../../test-resources/service-specs/v2/API_MULTIPLE_SCHEMAS_SRV/API_MULTIPLE_SCHEMAS_SRV.edmx'
      )
    ).not.toThrow();
  });
});
