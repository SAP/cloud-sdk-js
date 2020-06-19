/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { parseEdmxFromPath } from '../../src/parser';
import { EdmxMetadata as EdmxMetadataV2 } from '../../src/parser/parser-types-v2';
import { EdmxMetadata as EdmxMetadataV4 } from '../../src/parser/parser-types-v4';

describe('edmx-parser', () => {
  it('v2: parses edmx file to JSON and coerces properties to arrays', () => {
    const metadataEdmx = parseEdmxFromPath(
      '../../test-resources/service-specs/v2/API_TEST_SRV/API_TEST_SRV.edmx'
    ) as EdmxMetadataV2;

    expect(metadataEdmx.entitySets.length).toBe(10);
    expect(metadataEdmx.entityTypes.length).toBe(10);
    expect(metadataEdmx.functionImports.length).toBe(12);
    expect(metadataEdmx.complexTypes.length).toBe(3);
    expect(metadataEdmx.associationSets.length).toBe(8);
    expect(metadataEdmx.associations.length).toBe(8);

    metadataEdmx.entityTypes.forEach(e => {
      expect(e.Key.PropertyRef).toBeInstanceOf(Array);
      expect(e.NavigationProperty).toBeInstanceOf(Array);
      expect(e.Property).toBeInstanceOf(Array);
    });

    metadataEdmx.associationSets.forEach(a => {
      expect(a.End.length).toBe(2);
    });

    metadataEdmx.associations.forEach(a => {
      expect(a.End.length).toBe(2);
    });

    metadataEdmx.functionImports.forEach(f => {
      expect(f.Parameter).toBeInstanceOf(Array);
    });

    metadataEdmx.complexTypes.forEach(c => {
      expect(c.Property).toBeInstanceOf(Array);
    });
  });

  it('v4: parses edmx file to JSON and coerces properties to arrays', () => {
    const metadataEdmx = parseEdmxFromPath(
      '../../test-resources/service-specs/v4/API_TEST_SRV/API_TEST_SRV.edmx'
    ) as EdmxMetadataV4;

    expect(metadataEdmx.entitySets.length).toBe(10);
    expect(metadataEdmx.entityTypes.length).toBe(11);
    expect(metadataEdmx.functionImports.length).toBe(8);
    expect(metadataEdmx.functions.length).toBe(8);
    expect(metadataEdmx.complexTypes.length).toBe(4);
    expect(metadataEdmx.enumTypes.length).toBe(1);

    metadataEdmx.entitySets.forEach(e => {
      expect(e.NavigationPropertyBinding).toBeInstanceOf(Array);
    });

    metadataEdmx.entityTypes.forEach(e => {
      expect(e.Key.PropertyRef).toBeInstanceOf(Array);
      expect(e.Key.PropertyRef.length).toBeGreaterThan(0);
      expect(e.NavigationProperty).toBeInstanceOf(Array);
      expect(e.Property).toBeInstanceOf(Array);
    });

    const baseType = metadataEdmx.entityTypes.find(
      e => e.Name === 'A_TestEntityBaseType'
    );
    const entityWithBaseType = metadataEdmx.entityTypes.find(
      e => e.BaseType && e.BaseType.endsWith(baseType!.Name)
    );
    baseType?.Property.forEach(p => {
      expect(entityWithBaseType?.Property).toContain(p);
    });
    baseType?.NavigationProperty.forEach(n => {
      expect(entityWithBaseType?.NavigationProperty).toContain(n);
    });

    const baseComplexType = metadataEdmx.complexTypes.find(
      c => (c.Name = 'A_TestComplexBaseType')
    );
    const complexTypeWithBaseType = metadataEdmx.complexTypes.find(
      c => c.BaseType && c.BaseType.endsWith(baseComplexType!.Name)
    );

    baseComplexType?.Property.forEach(p => {
      expect(complexTypeWithBaseType?.Property).toContain(p);
    });

    metadataEdmx.functions.forEach(f => {
      expect(f.Parameter).toBeInstanceOf(Array);
    });

    metadataEdmx.complexTypes.forEach(c => {
      expect(c.Property).toBeInstanceOf(Array);
    });
  });

  it('does not fail for multiple schema entries in the edmx file', () => {
    expect(() =>
      parseEdmxFromPath(
        '../../test-resources/service-specs/v2/API_MULTIPLE_SCHEMAS_SRV/API_MULTIPLE_SCHEMAS_SRV.edmx'
      )
    ).not.toThrow();
  });
});
